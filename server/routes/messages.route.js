const express = require('express');
const messagesController = require('../controllers/send-message.controller');

const messagesRouter = express.Router();

messagesRouter.post('/send-message', messagesController.sendMessageController);

module.exports = messagesRouter;
