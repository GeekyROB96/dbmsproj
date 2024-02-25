const http = require('http');
 require('dotenv').config();
 const cors = require('cors');

const app = require('./app');
app.use(cors());
const port =  3000;

const server = http.createServer(app);

server.listen(port);
// const express = require('express');
// const cors = require('cors');

// const app = express();

// // Enable CORS for all routes
// app.use(cors());

// // Your other route handling code goes here

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
