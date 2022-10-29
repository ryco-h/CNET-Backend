const express = require('express')
const GameController = require('../controllers/game-controller')
const route = express.Router()

route.get('/', GameController.getGames)
// route.get('/game', GameController.getGameById)
// route.get('/game/:idGame', GameController.getGameById)
route.post('/register', GameController.registerGame)
route.delete('/delete/:id', GameController.deleteGame)

module.exports = route