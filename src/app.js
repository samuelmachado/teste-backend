const dotenv = require('dotenv/config')
const Express = require('express')
const bodyParser = require('body-parser')

const routes = require('./routes')

require('./database')

class App {
  constructor () {
    this.server = new Express()

    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.server.use(bodyParser.urlencoded({ extended: true }))
    this.server.use(Express.json())
  }

  routes () {
    this.server.use(routes)
  }
}

module.exports = new App().server
