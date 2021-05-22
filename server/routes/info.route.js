const express = require('express')
const controller = require('../controllers/info.controller')
const router = express.Router()

router.get('/item-info/:id', controller.getInfo)

module.exports = router
