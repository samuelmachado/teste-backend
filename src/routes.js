const Home = require("./controllers/home.js");
const express = require('express');
const routes = express.Router();


routes.get('/', Home.index);

module.exports = routes;