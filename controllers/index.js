const express = require('express')
const createGame = require('./findOrCreate')
const router = express.Router()

router.get('/:gameId?', createGame)

module.exports = router

