const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const path = require('path');
const expressWs = require('express-ws');
const eventsEmitter = require('./Events/events.emitter');

const homeRouter = require('./routes/home.route');
const messagesRouter = require('./routes/messages.route');

const app = express();
expressWs(app);
const port = 3000;
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../client/dist/client')));
app.use(cors(corsOptions));

app.use('/', homeRouter);
app.use('/messages', messagesRouter);

app.ws('/', (ws, req) => {
  ws.on('close', () => {
    console.log('WebSocket was closed');
  });

  eventsEmitter.on('sendMessage', (data) => {
    ws.send(data);
  });
});

app.listen(port, () => {
  console.log(`App is listening on ${port} port`);
});
