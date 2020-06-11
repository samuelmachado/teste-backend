class StatusController {
  async index (req, res) {
    res.json({ status: 'online' })
  }
}

module.exports = new StatusController()
