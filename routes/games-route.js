const express = require('express')
const GameController = require('../controllers/game-controller')
const route = express.Router()

route.get('/', GameController.getGames)
route.post('/register', GameController.registerGame)
route.put('/update', GameController.updateGame)
route.delete('/delete/:id', GameController.deleteGame)

module.exports = route