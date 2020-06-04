import Car from '../models/Car'
import CarModel from '../models/CarModel'

const limitCarForpage = 5

class CarController {
  async index (req, res) {

    const { page = 1 } = req.query

    try {
      const cars = await Car.findAll({
        attributes: ['id', 'plate', 'color', 'UnitId'],
        limit: limitCarForpage,
        offset: (page - 1) * limitCarForpage,
        include: [
          {
            model: CarModel,
            as: 'carModels',
            attributes: ['name', 'pathImage']
          }
        ]
      })
      return res.json(cars)
    } catch (err) {
      console.log(err);
    }
  }
}

export default new CarController()