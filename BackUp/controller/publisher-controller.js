const Publisher = require("../model/Publisher");

class PublisherController {

   static async getPublisher({id}) {
      let publisher = await Publisher.find({id: id})

      return publisher
   }

   static async registerPublisher(req, res) {

      let {id, name, company} = req.body.publisher

      let newPublisher = new Publisher(id, name, company)

      newPublisher = await newPublisher.save(newPublisher)
      
      res.send(newPublisher)
   }
}

module.exports = PublisherController;