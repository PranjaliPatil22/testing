// const express = require('express');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const app = express();
// const port = 3000;

// // MySQL connection configuration
// const db = mysql.createConnection({
//   host: 'localhost',  // Replace with your MySQL host from Render
//   user: 'root',  // Replace with your MySQL username
//   password: 'MySecure@123',  // Replace with your MySQL password
//   database: 'node',  // Replace with your MySQL database name
// });

// // Connect to MySQL
// db.connect(err => {
//   if (err) {
//     console.error('Database connection error:', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public')); // Serve static files (e.g., register.html)

// // Route to serve the registration form
// app.get('/register', (req, res) => {
//   res.sendFile(__dirname + '/register.html');
// });

// // Handle registration form submission
// app.post('/register', (req, res) => {
//   const { username, email, password } = req.body;
//   const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  
//   db.query(query, [username, email, password], (err, result) => {
//     if (err) {
//       console.error('Error during registration:', err);
//       return res.status(500).send('Error during registration');
//     }
//     res.send('Registration successful!');
//   });
// });

// // Start server
// app.listen(port, () => {
//   console.log('Server running at http://localhost:${port}');
// });


const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path'); // <-- Important
const app = express();
const port = 3000;

// MySQL connection configuration
const db = mysql.createConnection({
    host: 'localhost',  
    user: 'root',        
    password: 'MySecure@123',  
    database: 'node',   
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to MySQL database');

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )
  `;
  
  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Users table checked/created successfully');
    }
  });
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // <-- Important

// Route to serve the registration form
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html')); // <-- Important
});

// Handle registration form submission
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  
  db.query(query, [username, email, password], (err, result) => {
    if (err) {
      console.error('Error during registration:', err);
      return res.status(500).send('Error during registration');
    }
    res.send('Registration successful!'); // You can redirect to a success page if you want
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
