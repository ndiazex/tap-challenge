const Game = require("../models/Game")

const findOrCreate = async (req, res, next) => {
  try {
    const { gameId, userName } = req.params
    const game = new Game()
    if (gameId) {
      const gameFromDB = await game.findById(gameId)
      if(gameFromDB) return res.status(200).send(gameFromDB) 
      return res.status(404).send({ msg: 'Game nof found.'})
    }
    if(!userName) return  res.status(400).send({ msg: 'Parameter userName is required.'})
    const newGameId = await game.create(userName)
    res.status(201).send({ id: newGameId, msg: 'Game created!' })
  } catch (err) {
    console.log(err)
  }
}

module.exports = findOrCreate