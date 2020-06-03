const data = require("../../../veiculos.json")

let units = new Set()
let cars = []
let carModels = []
let carBrands = []

const removeDuplicateItem = (objs) => {
  return objs.filter( (obj) => {
    return !this[JSON.stringify(obj)] && (this[JSON.stringify(obj)] = true);
  }, Object.create(null))
}

const entityExtractor = (data) => {
   
  units.add(data.idUnidade)
  
  cars.push({
    "id": data.id,
    "idUnit": data.idUnidade,
    "idcarModels": data.idModelo,
    "carPlate": data.placa,
    "color": data.cor
  })

  carModels.push({
    "id": data.modelo.id,
    "name": data.modelo.modelo,
    "image": data.modelo.imagem,
    "idCarBrands": data.modelo.idFabricante
  })

  carBrands.push({
    "id": data.modelo.fabricante.id,
    "name": data.modelo.fabricante.nome
  })
}

export default async () => {
  
  data.map(entityExtractor)
  
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
