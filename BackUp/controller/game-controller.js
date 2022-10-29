const Game = require('../model/Game')
const Publisher = require('../../model/Publisher')
const SteamDatabase = require('../../model/SteamDB')
const { getPublisher } = require('./publisher-controller')

class GameController {

   static async getGames(req, res) {

      let game = await Game.find()

      res.send(game)
   }

   static async getGameById(req, res) {
      
      let id = req.params.id || req.query.id
      let gameById = await Game.findOne({id: id})

      if(gameById.length === 0) {
         return res.send({message: 'Game not found!', status: 404})
      }

      res.send(gameById)
   }

   static async registerGame(req, res) {

      // NOTES
      // This method is processed by the publisher
      // Condition: Publisher is already existed
      
      let {name, picture, description, dateReleased, price, genre, publisher, idCollection} = req.body.game

      let isPublisherRegistered = await Publisher.find()
      let dataGame = await Game.find()

      if(!isPublisherRegistered.map(publisher => publisher.id).includes(publisher)) {
         return res.send({
            message: 'Invalid publisher.',
            success: false,
            status: 404,
            reason: 'Publisher is not found.'
         })
      }

      let steamDB = await SteamDatabase.find()

      // Create new instance of Game
      let newGame = new Game(name, picture, description, dateReleased, price, genre, publisher, idCollection)

      // Mengecek apabila ID collection publisher sudah ada
      let collectionGame = await SteamDatabase.findOne({id: idCollection})

      // Register Game's ID
      newGame.id = 'game-' + Number(dataGame.length + 1)      
      
      if(collectionGame.length !== 0) { 
         
         // FindOnd method returns Array
         let gameArray = collectionGame[0].game
         gameArray.push(newGame.id)

         let SteamDBNewGame = new SteamDatabase({
            id: idCollection,
            game: gameArray,
            publisher: collectionGame[0].publisher
         })

         // Delete model key from the Class Object
         delete SteamDBNewGame.model

         console.log(SteamDBNewGame)
      } else {
         
         let steamDBNewCollections = new SteamDatabase({
            id: 'db-collection-' + steamDB.length + 1,
            game: SteamDBNewGame.push(newGame.id),
            publisher: collectionGame.publisher
         })
         console.log(steamDBNewCollections)
      }
      
      // return res.send({
      //    message: 'Publisher already has collection.',
      //    success: false,
      //    status: 400,
      //    reason: 'Publisher Duplication'
      // })
      // newGame = await newGame.save(newGame)
      
      res.send(newGame)
   }
}

module.exports = GameController
