const steamdb = require("../models").SteamDB
const publisher = require("../models").Publisher
const game = require("../models").Game

const { Op } = require("sequelize");

class PublisherController {

   static getPublisher(req, res) {

      publisher.findAll({
         order: [
            ['idPublisher', 'DESC'] 
        ]
      })
      .then((result) => {
         res.send(result)
      })
      .catch((error) => {
         console.log(error)
      })
   }

   static getPublisherByID(req, res) {

      const idPublisher = req.params.id

      publisher.findOne({
         where: {idPublisher}
      })
      .then((result) => {
         res.send(result)
      })
      .catch((error) => {
         console.log(error)
      })
   }

   static async registerPublisher(req, res) {

      const {name, company, username, password} = req.body

      
      let idPublisher = await publisher.findAll()
      console.log(idPublisher.length)
      idPublisher = 'pub-' + Number(idPublisher.length + 1)
      console.log(idPublisher)

      let isPublisherExist = await publisher.findOne({where: {[Op.or]: [{name},{username}]}})

      if(isPublisherExist) {
         return res.send({
            message: 'Gagal membuat Publisher',
            status: 400
         })
      }

      publisher.create({
         idPublisher,
         name,
         company,
         username,
         password
      })
      .then((result) => {
         res.send(result)
      })
      .catch((error) => {
         console.log(error)
      })
   }

   static deletePublisher(req, res) {

      const idPublisher = req.params.id

      publisher.destroy({
         where: {
            idPublisher
         }
      })
      .then((result) => {
         if(result) {
            return res.send({
               message: 'Berhasil menghapus data Publisher'
            })
         } else {
            return res.send({
               message: 'Gagal Menghapus data Publisher',
               status: 404
            })
         }
      })
      .catch((error) => {
         return res.send({
            message: 'Gagal menghapus data Publisher',
            reason: error
         })
      })
   }

   static updatePublisher(req, res) {

      const idPublisher = req.params.id
      const {name, company, username, password} = req.body


      publisher.update(
         {
            name,
            company,
            username,
            password
         },
         {
            where: {
               idPublisher
            }
         }
      )
      .then((result) => {
         if(result) {
            return res.send({
               message: 'Berhasil merubah data Publisher'
            })
         } else {
            return res.send({
               message: 'Gagal merubah data Publisher'
            })
         }
      })
      .catch((error) => {
         return res.send({
            message: 'Gagal merubah data Publisher',
            reason: error
         })
      })
   }
}

module.exports = PublisherController