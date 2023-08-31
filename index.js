const app = require('express')(); 
const cors = require('cors')
const http = require('http').Server(app);
const express = require('express'); // para manejar como servicio

const hostname = '127.0.0.1';
const port = 3000;

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(express.json({ limit: '10mb' }));

//routes
app.use(require('./routes/usuario'));


http.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});