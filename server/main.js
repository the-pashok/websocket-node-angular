const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const router = express.Router();
const port = 85;
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/client/dist/client'));
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
});

app.listen(port, () => {
  console.log(`App is listening on ${port} port`);
});
