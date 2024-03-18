const http = require('http');
 require('dotenv').config();
 const cors = require('cors');

const app = require('./app');
app.use(cors());
const port =  3000;

const server = http.createServer(app);

server.listen(port);




