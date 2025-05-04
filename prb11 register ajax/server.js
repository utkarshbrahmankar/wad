const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

app.post('/register', (req, res) => {
  console.log("Received user:", req.body);
  res.status(201).send("User received");
});

// Optional: default route for root access
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8000, () => console.log("Server running at http://localhost:8000"));
