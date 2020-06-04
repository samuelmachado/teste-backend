import Schedule from '../models/Schedule'
import User from '../models/User'
import Car from '../models/Car'
import CarBrand from '../models/CarBrand'
import verifySchedule from '../sevice/verifySchedule'

import { startOfHour, parseISO, isBefore, subHours } from 'date-fns'
import * as Yup from 'yup'
import CarModel from '../models/CarModel'

const limitCarForpage = 2
const dayMilliseconds = (1000 * 60 * 60 * 24)

class CheckInController {
  async index (req, res){
    const { page = 1 } = req.query

    const schedule = await Schedule.findAll({
      where: { 'UserId': req.userId },
      order: ['withdrawalDate'],
      attributes: ['id', 'withdrawalDate', 'deliveryDate'],
      limit: limitCarForpage,
      offset: (page - 1) * limitCarForpage,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
        {
          model: Car,
          as: 'carId',
          attributes: ['id', 'plate', 'color', 'UnitId'],
          include: [
            {
              model: CarModel,
              as: 'carModels',
              attributes: ['name', 'pathImage'],
              include: [
                {
                  model: CarBrand,
                  as: 'carBrandId',
                  attributes: ['name'],
                }
              ]
            }
          ]
        },
      ], 
    })
    return res.json(schedule)
  }

  async store (req, res) {
    const schema = Yup.object().shape({
      CarId: Yup.number().required(),
      withdrawalDate: Yup.date().required(),
      deliveryDate: Yup.date().required()
    })
  
    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Dados incorretos, favor conferir' })
    }

    const { CarId, withdrawalDate, deliveryDate } = req.body
    const WithdrawalDate = startOfHour(parseISO(withdrawalDate))
    const DeliveryDate = startOfHour(parseISO(deliveryDate))

    if (!isBefore(WithdrawalDate, DeliveryDate)) {
      return res.status(400).json({ error: 'A data de check In deve ser anterior a data de check Out!' })
    }
    
    if (isBefore(WithdrawalDate, new Date()) || isBefore(DeliveryDate, new Date()) ) {
      return res.status(400).json({ error: 'Datas passadas não são permitidas' })
    }

    const differenceMilliseconds = Math.abs(DeliveryDate.getTime() - WithdrawalDate.getTime());

    if (differenceMilliseconds > 3 * dayMilliseconds) {
      return res.status(400).json({ error: 'Uma reserva de veículo deve durar no máximo 3 dias' })
    }

    const create = await verifySchedule(WithdrawalDate, DeliveryDate, CarId)
    
    if( create ){
      const schedule = await Schedule.create({
        UserId: req.userId,
        CarId,
        withdrawalDate,
        deliveryDate
      })
      return res.json(schedule)
    }
    return res.status(400).json({ error: 'Esta data não está disponível' })
  }
}

export default new CheckInController()
