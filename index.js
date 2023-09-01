const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);

const hostname = '127.0.0.1';
const port = 3000;

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(express.json({ limit: '10mb' }));


// Rutas
app.use(require('./routes/usuario'));

// Rutas de inicio de sesión
const userRoute = require('./routes/login');
app.use('/user', userRoute);

http.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
