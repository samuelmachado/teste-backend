const { Router } = require('express')

const authMiddleware = require('./app/middlewares/auth')
const ImportController = require('./app/controllers/ImportController')
const AuthController = require('./app/controllers/AuthController')
const StatusController = require('./app/controllers/StatusController')
const UsuarioController = require('./app/controllers/UsuarioController')
const ClienteController = require('./app/controllers/ClienteController')
const AgendamentoController = require('./app/controllers/AgendamentoController')
const AgendaController = require('./app/controllers/AgendaController')

const router = new Router()

router.get('/importar', ImportController.importarArquivo)

// Faz o cadastro de clientes
router.post('/clientes', ClienteController.store)

// Faz o cadastro de Atendentes que usarão o Car Sharing
router.post('/usuarios', UsuarioController.store)

// Gera o token JWT de autenticação do Atendente
router.post('/login', AuthController.store)

// Verifica se a aplicação está no ar
router.get('/', StatusController.index)

// Todos os endpoints abaixo requerem autenticação
router.use(authMiddleware)

// Lista todos os usuários
router.get('/usuarios', UsuarioController.index)

// Consulta toda a agenda
router.get('/agenda', AgendaController.index)

// Consulta veiculos disponiveis por unidade
router.get('/disponivel', AgendaController.disponivel)

// Checkin e Checkout
router.post('/agendamentos/checkin', AgendamentoController.checkin)
router.post('/agendamentos/checkout', AgendamentoController.checkout)

module.exports = router
