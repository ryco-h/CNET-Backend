const express = require('express')
const SteamDBController = require('../controllers/steamdb-controller')
const route = express.Router()

// All CRUD data should be handled by another controller, these routes are just for testing purposes
route.get('/', SteamDBController.getSteamDB)
route.delete('/delete/:id', SteamDBController.deleteSteamDB)

module.exports = route