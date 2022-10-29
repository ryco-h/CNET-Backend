const Model = require('./Model');

class Game extends Model {

   constructor(name, picture, description, price, dateReleased, genre, publisher) {
      super()
      this.id = '';
      this.name = name;
      this.picture = picture;
      this.description = description;
      this.price = price;
      this.dateReleased = dateReleased;
      this.genre = genre;
      this.publisher = publisher;
      this.model = 'Game';
   }
   
   static model = 'Game'
}

// module.exports = Game;