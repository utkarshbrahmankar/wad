const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Song = require('./models/songs.js');

const app = express();
mongoose.connect('mongodb://127.0.0.1/music');
app.use(express.urlencoded({ extended: true }));



// Seed data if empty
async function seed() {
  const count = await Song.countDocuments();
  if (count === 0) {
    await Song.insertMany([
      { songname: "Tum Hi Ho", film: "Aashiqui 2", music_director: "Mithoon", singer: "Arijit Singh" },
      { songname: "Kun Faya Kun", film: "Rockstar", music_director: "AR Rahman", singer: "Mohit Chauhan" },
      { songname: "Zaalima", film: "Raees", music_director: "JAM8", singer: "Arijit Singh" },
      { songname: "Kal Ho Naa Ho", film: "KHNH", music_director: "Shankar Ehsaan Loy", singer: "Sonu Nigam" },
      { songname: "Senorita", film: "Zindagi Na Milegi Dobara", music_director: "Shankar Ehsaan Loy", singer: "Farhan Akhtar" }
    ]);
  }
}
seed();

// Render index
app.get('/', async (req, res) => {
  const songs = await Song.find();
  const html = fs.readFileSync('./views/index.html', 'utf8');
  const rows = songs.map(s => `
    <tr><td>${s.songname}</td><td>${s.film}</td><td>${s.music_director}</td><td>${s.singer}</td><td>${s.actor || ''}</td><td>${s.actress || ''}</td></tr>
  `);
  res.send(html.replace('<!--SONG_ROWS-->', rows).replace('<!--COUNT-->', songs.length));
});

// Add
app.get('/add', (req, res) => res.sendFile(path.join(__dirname, '/views/add.html')));
app.post('/add', async (req, res) => {
  await Song.create(req.body);
  res.redirect('/');
});

// Delete
app.get('/delete', (req, res) => res.sendFile(path.join(__dirname, '/views/delete.html')));
app.post('/delete', async (req, res) => {
  await Song.deleteOne({ songname: req.body.songname });
  res.redirect('/');
});

// Update
app.get('/update', (req, res) => res.sendFile(path.join(__dirname, '/views/update.html')));
app.post('/update', async (req, res) => {
  await Song.updateOne(
    { songname: req.body.songname },
    { actor: req.body.actor, actress: req.body.actress }
  );
  res.redirect('/');
});

// Filter
app.get('/filter', (req, res) => res.sendFile(path.join(__dirname, '/views/filter.html')));

app.get('/filter/director', async (req, res) => {
  const songs = await Song.find({ music_director: req.query.music_director });
  let html = `<h1>Song List</h1><table border="1"><tr><th>Song</th><th>Film</th><th>Music Director</th><th>Singer</th><th>Actor</th><th>Actress</th></tr>`;
  songs.forEach(song => {
    html += `<tr><td>${song.songname}</td><td>${song.film}</td><td>${song.music_director}</td><td>${song.singer}</td><td>${song.actor || ""}</td><td>${song.actress || ""}</td></tr>`;
  });
  html += `</table>`;
  res.send(html);
});

app.get('/filter/director-singer', async (req, res) => {
  const songs = await Song.find({ music_director: req.query.music_director, singer: req.query.singer });
  let html = `<h1>Song List</h1><table border="1"><tr><th>Song</th><th>Film</th><th>Music Director</th><th>Singer</th><th>Actor</th><th>Actress</th></tr>`;
  songs.forEach(song => {
    html += `<tr><td>${song.songname}</td><td>${song.film}</td><td>${song.music_director}</td><td>${song.singer}</td><td>${song.actor || ""}</td><td>${song.actress || ""}</td></tr>`;
  });
  html += `</table>`;
  res.send(html);
});

app.get('/filter/singer-film', async (req, res) => {
  const songs = await Song.find({ singer: req.query.singer, film: req.query.film });
  let html = `<h1>Song List</h1><table border="1"><tr><th>Song</th><th>Film</th><th>Music Director</th><th>Singer</th><th>Actor</th><th>Actress</th></tr>`;
  songs.forEach(song => {
    html += `<tr><td>${song.songname}</td><td>${song.film}</td><td>${song.music_director}</td><td>${song.singer}</td><td>${song.actor || ""}</td><td>${song.actress || ""}</td></tr>`;
  });
  html += `</table>`;
  res.send(html);
});

app.listen(3000, () => console.log('http://localhost:3000'));
