import dataLoadService from "../sevice/DataLoadService"

import CarModel from '../models/CarModel'
import Unit from '../models/Unit'
import Car from '../models/Car'
import CarBrand from '../models/CarBrand'

const models = [Unit, CarBrand, CarModel, Car]

class DataLoadController {
  
  async verify (obj, idModel) {
    return  !(await models[idModel].findOne({ where: { id: obj.id } }))
  }

  async dataLoad (){
    const data = dataLoadService()
    
    try {

      data.units.map(async (id) => {
        let unity = {"id": id}
        if (await this.verify(unity, 0)){
          await Unit.create(unity)
        }
      })

      data.carBrands.map(async (carBrand) => {
        if (await this.verify(carBrand, 1)){
          await CarBrand.create(carBrand)
        }
      })
      
      data.carModels.map(async (carModel) => {
        if (await this.verify(carModel, 2)){
          await CarModel.create(carModel)
        }
      })
  
      data.cars.map(async (car) => {
        if (await this.verify(car, 3)){
          await Car.create(car)
        }
      })

    } catch (err) {
      console.log(err);
    }
  }
}
export default new DataLoadController()