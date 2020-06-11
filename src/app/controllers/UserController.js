const User = require('../models/User')
const Yup = require('yup')

class UserController {
  async index (req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'active']
    })
    res.status(200).json(users)
  }

  async store (req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required().strict(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6).strict()
    })

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { name, email, password } = req.body
    const usr = await User.findOne({ where: { email } })
    if (usr) {
      return res.status(409).json({ error: `Email ${email} already exists` })
    }

    const user = await User.create({ name, email, password })
    res.status(201).json({ id: user.id, name, email, active: user.active })
  }

  async update (req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required().min(2).strict(),
      email: Yup.string().email().required(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when(
          'oldPassword',
          (oldPassword, field) => (oldPassword ? field.required() : field)
        ),
      confirmPassword: Yup.string().when(
        'password',
        (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
      )
    })

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { userId } = req
    const { name, email, active, oldPassword } = req.body

    const user = await User.findByPk(userId)
    const emailExists = await User.findOne({ where: { email } })

    if (oldPassword && !await user.checkPassword(oldPassword)) {
      return res.status(400).json({ error: 'Password does not match' })
    }

    if (user.id !== emailExists.id) {
      return res.status(409).json({ error: `Email ${email} already exists` })
    }

    user.name = name
    user.email = email
    user.active = active
    user.password = oldPassword

    await user.save()
    req.status(200).json({ id: user.id, name, email, active })
  }

  async delete (req, res) {
    const { userId } = req

    const user = await User.findByPk(userId)
    user.active = false

    await user.save()
    res.status(204)
  }
}

module.exports = new UserController()
