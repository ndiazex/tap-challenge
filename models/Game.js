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
        score: 0,
        startDate: Timestamp.fromDate(new Date()),
        userName
      })
      return newGame.id
    } catch (err) {
      console.log(err)
    }
  }

  async findById(gameId) {
    try {
      const game = await db.doc(`games/${gameId}`).get()
      if (game.data()) return game.data()
    } catch (error) {
      console.log(err)
    }
  }
}

module.exports = Game