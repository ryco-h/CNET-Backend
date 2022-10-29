const express = require('express')
const PublisherController = require('../controllers/publisher-controller')
const route = express.Router()

route.get('/', PublisherController.getPublisher)
route.get('/:id', PublisherController.getPublisherByID)
route.post('/register-publisher', PublisherController.registerPublisher)
route.delete('/delete-publisher/:id', PublisherController.deletePublisher)
route.put('/update-publisher/:id', PublisherController.updatePublisher)

module.exports = route