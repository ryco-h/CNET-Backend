const Game = require("../model/Game");
const Publisher = require("../model/Publisher");
const SteamDatabase = require("../model/SteamDB");
const PublisherController = require("./publisher-controller");

class SteamDBController {

   static async getSteamDB(req, res) {
      let steamDB = await SteamDatabase.find();
      let dataPublisher = await Publisher.find()
      let dataGame = await Game.find();

      if(!steamDB) {
         return res.send({ message: 'Error' })
      }

      res.send(steamDB.map(r => ({
         id: r.id,
         game: r.game.map(id => {
            return dataGame.filter(game => game.id === id).map(game => {
               let {name, dateReleased, price, genre} = game

               return new Game(id, name, dateReleased, price, genre)
            })[0]
         }),
         publisher: dataPublisher.filter(publisher => publisher.id === r.publisher)
      })))
   }

   static async getDataByPublisher(req, res) {
      let dataGame = await SteamDatabase.find();

      dataGame = dataGame
         .filter((dataGame) => dataGame.publisher === req.params.publisher)

      res.send(dataGame)
   }
}

module.exports = SteamDBController;