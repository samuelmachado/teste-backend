const { Router } = require('express')

const authMiddleware = require('./app/middlewares/auth')
const AuthController = require('./app/controllers/AuthController')
const StatusController = require('./app/controllers/StatusController')
const UserController = require('./app/controllers/UserController')

const router = new Router()

router.post('/auth', AuthController.store)
router.post('/users', UserController.store)
router.get('/', StatusController.index)

// Todos os endpoints abaixo requerem autenticação
router.use(authMiddleware)

router.get('/users', UserController.index)
router.put('/users', UserController.update)
router.delete('/users', UserController.delete)

module.exports = router
