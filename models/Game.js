const { initializeApp, applicationDefault, cert } = require('firebase-admin/app')
const { getFirestore, Timestamp } = require('firebase-admin/firestore')
const serviceAccount = require('../serviceAccountKey.json')

initializeApp({
  credential: cert(serviceAccount)
})

const db = getFirestore()
class Game {
  constructor() {}

  async create(userName) {
    try {
      const docRef = db.collection('games')
      const newGame = await docRef.add({
        userName,
        startDate: Timestamp.fromDate(new Date())
      })
      console.log("🚀 ~ file: Game.js ~ line 20 ~ Game ~ create ~ newGame", newGame.id)
      return newGame.id
    } catch (err) {
    console.log("🚀 ~ file: Game.js ~ line 23 ~ Game ~ create ~ err", err)
    }
  }

  async findById(gameId) {
    try {
      const game = await db.doc(`games/${gameId}`).get()
      if (game) return game.data()
    } catch (error) {
      console.log("🚀 ~ file: Game.js ~ line 29 ~ Game ~ findById ~ error", error)
    }
  }
}

module.exports = Game