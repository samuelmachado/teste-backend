const app = require('./app')

const port = process.env.PORT || 3333

module.exports = app.listen(port, () => { console.log(`Servidor rodando na porta ${port}`) })
