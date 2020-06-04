import { Router } from 'express'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import authMiddleware from './app/middlewares/auth'

const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)


import Schedule from './app/models/Schedule'
import CarModel from './app/models/CarModel'
import Unit from './app/models/Unit'
import Car from './app/models/Car'
import CarBrand from './app/models/CarBrand'

routes.get('/', async (req, res) => {

  try {

    const carBrand = await CarBrand.create({
      id: 1,
      name: 'fiat',
    })

    const carModel = await CarModel.create({
      id: 22,
      name: 'uno',
      pathImage: 'bobsponja/image.png',
      CarBrandId:1
    })

    // const unit = await Unit.create({
    //   id: 89,
    // })
    
    // const car = await Car.create(
    //   { CarModelId: 88,
    //   plate: 'lnh-4738',
    //   color: 'black',
    //   id: 13,
     
    //   UnitId: 89
    // })


    // const schedule = await Schedule.create({ 
    //   withdrawalDate: '2020-05-22 12:30:20',
    //   deliveryDate: '2020-07-22 12:30:20',
    //   UserId: 1,
    //   CarId: 1
    // })
    return res.json(carModel)
  } catch (err) {
    console.log(err);
  }
})

routes.use(authMiddleware)

routes.put('/users', UserController.update)



export default routes