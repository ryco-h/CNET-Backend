const steamdb = require('../models').SteamDB
const game = require('../models').Game
const publisherModel = require('../models').Publisher

class SteamDBController {

   static async getSteamDB(req, res) {
      let steamDB = await steamdb.findAll();
      let dataPublisher = await publisherModel.findAll()
      let dataGame = await game.findAll();

      if(!steamDB) {
         return res.send({ message: 'Error' })
      }

      res.send(steamDB.map(r => ({
         idSteamDB: r.idSteamDB,
         game: r.games.map(idGame => {
            return dataGame.filter(game => game.idGame === idGame).map(game => {
               let {idGame, name, picture, description, price, dateReleased, genre} = game

               return {idGame, name, picture, description, price, dateReleased, genre}
            })[0]
         }),
         publisher: dataPublisher.filter(publisher => publisher.idPublisher === r.publisher)
      })))
   }

   static deleteSteamDB(req, res) {

      const idSteamDB = req.params.id

      steamdb.destroy({
         where: {idSteamDB}
      })
      .then((result) => {
         if(result) {
            res.send({
               message: 'Berhasil menghapus SteamDB'
            })
         } else {
            res.send({
               message: 'SteamDB tidak ditemukan.'
            })
         }
      })
      .catch((error) => {
         res.send(error)
      })
   }
}

module.exports = SteamDBController;