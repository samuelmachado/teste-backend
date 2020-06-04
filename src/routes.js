import { Router } from 'express'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import authMiddleware from './app/middlewares/auth'

const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)


import Schedule from './app/models/Schedule'

routes.get('/', async (req, res) => {

  try {
    
    const carModel = await Schedule.create({id:149, name: 'lnh4743', pathImage: 'jfnrijf/image.png' })
    return res.json(carModel)
  } catch (err) {
    console.log(err);
  }
})

routes.use(authMiddleware)

routes.put('/users', UserController.update)



export default routes