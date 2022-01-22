const Game = require("../models/Game")

const findOrCreate = async (req, res, next) => {
  try {
    const { gameId } = req.params
    const { userName } = req.body
    const game = new Game()
    if (gameId) {
      const gameFromDB = await game.findById(gameId)
      if(gameFromDB) return res.send(gameFromDB) 
    }
    if(!userName) throw 'Parameter userName is required.'
    const newGameId = await game.create(userName)
    res.status(200).send({ id: newGameId, msg: 'Game created!' })
  } catch (err) {
    console.log(err)
  }
}

module.exports = findOrCreate