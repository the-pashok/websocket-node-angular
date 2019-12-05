const express = require('express');
const homeController = require('../controllers/home.controller');

const homeRouter = express.Router();

homeRouter.get('/', homeController.homeController);

module.exports = homeRouter;
