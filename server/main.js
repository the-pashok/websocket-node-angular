const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const expressWs = require('express-ws');
expressWs(app);
const router = express.Router();
const port = 85;
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};
const Emitter = require("events");
const emitter = new Emitter();
// const messages = require('./routes/message.routes.js')(router);

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../client/dist/client')));
app.use(cors(corsOptions));
// app.use('/messages', messages);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/client/index.html'));
});

app.post('/messages/send-message', (req, res) => {
  const message = req.body.message;
  const reversedMessage = message.split("").reverse().join("");
  emitter.emit('sendMessage', reversedMessage);
  res.json({success: true, message: req.body.message, reversedMessage});
});

app.ws('/', (ws, req) => {
  console.log('Websocket server started !');

  ws.on('close', () => {
    console.log('WebSocket was closed');
  });

  emitter.on('sendMessage', (data) => {
    ws.send(data);
  });
});

app.listen(port, () => {
  console.log(`App is listening on ${port} port`);
});
