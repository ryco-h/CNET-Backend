const fs = require('fs');
const Model = require('./Model');

class SteamDatabase extends Model {

   constructor({id, game, publisher}) {
      super()
      this.id = id;
      this.game = game;
      this.publisher = publisher;
      this.model = 'SteamDB';
   }

   static model = 'SteamDB';
}

// module.exports = SteamDatabase;