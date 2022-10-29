const Model = require('./Model');

class Publisher extends Model {

   constructor(id, name, company) {
      super()
      this.id = id;
      this.name = name;
      this.company = company;
      this.model = 'Publisher';
   }

   static model = 'Publisher';
}

// module.exports = Publisher;