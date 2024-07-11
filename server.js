const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'task12345678+', // Replace with your MySQL password
  database: 'crud_api_db' // Replace with your database name
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.json());

// CRUD APIs
// Create a user
app.post('/api/users', (req, res) => {
  const userData = req.body;
  const sql = 'INSERT INTO users SET ?';
  db.query(sql, userData, (err, result) => {
    if (err) throw err;
    res.status(201).send('User added to database');
  });
});

// Read all users
app.get('/api/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update a user
app.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const newUserData = req.body;
  const sql = 'UPDATE users SET ? WHERE id = ?';
  db.query(sql, [newUserData, id], (err, result) => {
    if (err) throw err;
    res.send('User updated');
  });
});

// Delete a user
app.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.send('User deleted');
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
