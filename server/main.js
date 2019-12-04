const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const path = require('path');
const expressWs = require('express-ws');

const app = express();
expressWs(app);
const port = 85;
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};
const Emitter = require("events");
const emitter = new Emitter();

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../client/dist/client')));
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/client/index.html'));
});

app.post('/messages/send-message', (req, res) => {
  const { message } = req.body;
  const reversedMessage = message.split("").reverse().join("");
  emitter.emit('sendMessage', reversedMessage);
  res.json({success: true, reversedMessage});
});

app.ws('/', (ws, req) => {
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
