const steamdb = require('../models').SteamDB
const game = require('../models').Game
const publisherModel = require('../models').Publisher

const { Op } = require("sequelize");

class GameController {

   static getGames(req, res) {
      game.findAll()
      .then((result) => {
         res.send(result)
      })
      .catch((error) => {
         res.send(error)
      })
   }

   static async registerGame(req, res) {

      const {name, picture, description, dateReleased, price, genre, publisher} = req.body

      let idPublisher = await steamdb.findAll()
      idPublisher = 'pub-' + Number(idPublisher.length + 2)


      let isPublisherExist = await publisherModel.findOne({where: {idPublisher: publisher}})
      if(!isPublisherExist) {
         return res.send({
            message: 'Publisher tidak ditemukan.',
            status: 404
         })
      }


      let isGameAlreadyExist = await game.findOne({where: {name}})
      if(isGameAlreadyExist) {

         return res.send({
            message: 'Game sudah ada.',
            status: 400,
            error: 'Duplication'
         })
      }

      let idGame = await game.findAll()
      idGame = 'game-' + Number(idGame.length + 1)

      await game.create({
         idGame: idGame,
         name: name,
         picture: picture,
         description: description,
         dateReleased: Date(dateReleased),
         price: Number(price),
         genre: genre,
         publisher: publisher
      })
      .then(async (result) => {

         // Check if SteamDB Collection already exists
         const steamDB = await steamdb.findOne({where: {publisher}})
         if(!steamDB) {
            
            // Create new SteamDB Collection
            let idSteamDB = await steamdb.findAll()
            idSteamDB = 'db-collection-' + Number(idSteamDB.length + 1)
            
            let games = []
            games.push(result.dataValues.idGame)
            
            await steamdb.create({
               idSteamDB: idSteamDB,
               games: games,
               publisher: publisher
            })
            .then((result) => {
               res.send({
                  message: `Berhasil membuat Game dan memasukkan ke dalam koleksi.`,
                  steamDB: idSteamDB,
                  games,
                  publisher,
               })
            })
            .catch((error) => {
               res.send({
                  message: 'Gagal membuat SteamDB Collection'
               })
            })
         } else if(steamDB) {

            
            let games = steamDB.dataValues.games
            
            if(steamDB.dataValues.games.includes(result.dataValues.id)) {
               console.log(steamDB.dataValues.games.includes(result.dataValues.id), games.push(result.dataValues.id))
               return res.send({
                  message: 'Game sudah ada.'
               })
            } else {
               games.push(result.dataValues.idGame)

               await steamdb.update({
                  idSteamDB: steamDB.idSteamDB,
                  games: games,
                  publisher: steamDB.publisher
               },
               {
                  where:
                  {
                     idSteamDB: steamDB.idSteamDB
                  }
               })
               .then((result) => {
                  res.send({
                     message: `Berhasil membuat Game dan memasukkan ke dalam koleksi.`,
                     steamDB: steamDB.idSteamDB,
                     games,
                     publisher: steamDB.publisher,
                  })
               })
               .catch((error) => {
                  res.send({
                     message: 'Gagal membuat SteamDB Collection'
                  })
               })
            }

            // await steamdb.update({
            //    idSteamDB: steamDB.dataValues.idSteamDB,
            //    games: games,
            //    publisher: steamDB.dataValues.publisher
            // },
            // {
            //    where: {idSteamDB: steamDB.dataValues.idSteamDB}
            // })
            // .then((result) => {
            //    if(result) {
            //       return res.send({
            //          message: 'Berhasil menghapus data Game'
            //       })
            //    } else {
            //       return res.send({
            //          message: 'Gagal Menghapus data Game || Database sudah kosong',
            //          status: 404,
            //          result: result
            //       })
            //    }
            // })
            // .catch((error) => {
            //    res.send(error)
            // })

            // return res.send({
            //    message: 'Collection is found'
            // })
         }
      })
      .catch((error) => {
         res.send(error)
      })
   }

   static async deleteGame(req, res) {

      const id = req.params.id
      let option = (req.query.option === 'truncate') ? [{ truncate: true, restartIdentity: true }, {where: {id}}] : [{where: {id}}]
      
      // let steamDBs = await steamdb.findOne({where: {games: {[Op.contains]: [id]}}})
      // console.log(steamDBs)

      // let gamess = steamDBs.dataValues.games
      // console.log(gamess, 'games')

      // gamess = removeItemAll(gamess, id)

      // console.log(gamess, 'gamess')


      game.destroy(option[0])
      .then(async (result) => {

         
         let steamDB = await steamdb.findOne({where: {games: {[Op.contains]: [id]}}})
         console.log(steamDB.dataValues.idSteamDB)

         if(steamDB) {
            let games = steamDB.dataValues.games
            games = removeItemAll(games)

            await steamdb.update({
               idSteamDB: steamDB.dataValues.idSteamDB,
               games: games,
               publisher: steamDB.dataValues.publisher
            },
            {
               where: {idSteamDB: steamDB.dataValues.idSteamDB}
            })
            .then((result) => {
               if(result) {
                  return res.send({
                     message: 'Berhasil menghapus data Game'
                  })
               } else {
                  return res.send({
                     message: 'Gagal Menghapus data Game || Database sudah kosong',
                     status: 404,
                     result: result
                  })
               }
            })
            .catch((error) => {
               res.send(error)
            })
         }         
      })
      .catch((error) => {
         return res.send({
            message: 'Gagal menghapus data Game',
            statsu: 404,
            error: error
         })
      })
   }
}

function removeItemAll(arr, value) {
   var i = 0;
   while (i < arr.length) {
      if (arr[i] === value) {
         arr.splice(i, 1);
      } else {
         ++i;
      }
   }
   return arr;
}

module.exports = GameController