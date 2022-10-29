const steamdb = require("../models").SteamDB

class SteamDBController {

   static getSteamDB(req, res) {

      steamdb.findAll()
      .then((result) => {
         res.send(result)
      })
      .catch((error) => {
         res.send(error)
      })
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