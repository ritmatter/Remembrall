// config/db.js
  module.exports = {
    mongoUri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/rank_your_friends_development'
  }
