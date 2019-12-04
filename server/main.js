const express = require('express');
const WebSocketServer = require('websocket').server;
const parser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const httpServer = require('http').createServer(app);
const router = express.Router();
const port = 85;
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};
const messages = require('./routes/message.routes.js')(router);

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../client/dist/client')));
app.use(cors(corsOptions));
app.use('/messages', messages);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/client/index.html'));
});

app.listen(port, () => {
  console.log(`App is listening on ${port} port`);
});
