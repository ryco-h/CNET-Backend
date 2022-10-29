const express = require('express')
const SteamDBController = require('../controllers/steamdb-controller')
const route = express.Router()

route.get('/', SteamDBController.getSteamDB)
route.delete('/delete/:id', SteamDBController.deleteSteamDB)

module.exports = route