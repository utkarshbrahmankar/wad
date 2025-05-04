const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  songname: String,
  film: String,
  music_director: String,
  singer: String,
  actor: String,
  actress: String
});

module.exports = mongoose.model('Song', songSchema);
