const data = require("../../../veiculos.json")

let units = []
let cars = []
let carModels = []
let carBrands = []

const removeDuplicateItem = (objs) => {
  return objs.filter( (obj) => {
    return !this[JSON.stringify(obj)] && (this[JSON.stringify(obj)] = true);
  }, Object.create(null))
}

const entityExtractor = (data) => {
   
  units.push(data.idUnidade)
  
  cars.push({
    "id": data.id,
    "UnitId": data.idUnidade,
    "CarModelId": data.idModelo,
    "plate": data.placa,
    "color": data.cor
  })

  carModels.push({
    "id": data.modelo.id,
    "name": data.modelo.modelo,
    "pathImage": data.modelo.imagem,
    "CarBrandId": data.modelo.idFabricante
  })

  carBrands.push({
    "id": data.modelo.fabricante.id,
    "name": data.modelo.fabricante.nome
  })
}

export default () => {
  
  data.map(entityExtractor)
  
  units = removeDuplicateItem(units)
  cars = removeDuplicateItem(cars)
  carModels = removeDuplicateItem(carModels)
  carBrands = removeDuplicateItem(carBrands)

  return {
    units,
    cars,
    carModels,
    carBrands
  }
}
