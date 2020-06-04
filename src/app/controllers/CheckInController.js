import Schedule from '../models/Schedule'
import verifySchedule from '../sevice/verifySchedule'

import { startOfHour, parseISO, isBefore, subHours } from 'date-fns'
import * as Yup from 'yup'

const limitCarForpage = 2
const dayMilliseconds = (1000 * 60 * 60 * 24)

class CheckInController {
  async index (req, res){
    const { page = 1 } = req.query

    const schedule = await Schedule.findAll({
      where: { UserId: req.userId },
      order: ['date'],
      attributes: ['id', 'withdrawalDate', 'deliveryDate'],
      limit: limitCarForpage,
      offset: (page - 1) * limitCarForpage,
      include: [
        {
          model: UserId,
          as: 'user',
          attributes: ['name'],
        },
        {
          model: CarId,
          as: 'carId',
          attributes: ['id', 'plate', 'color', 'UnitId'],
          include: [
            {
              model: CarModelId,
              as: 'carModels',
              attributes: ['id', 'name', 'pathImage'],
              include: [
                {
                  model: CarBrandId,
                  as: 'carBrandId',
                  attributes: ['name']
                }
              ]
            }
          ]
        },
      ]
    })
    return res.json(schedule)
  }

  verify () {
    return 1
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

  async delete (req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email']
        }
      ]
    })

    if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to cancel this appointment."
      })
    }

    const dateWithSub = subHours(appointment.date, 2)

    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error: 'You can only cancel appointments 2 hours in advance.'
      })
    }

    appointment.canceled_at = new Date()

    await appointment.save()

    await Queue.add(CancellationMail.key, { appointment })

    return res.json(appointment)
  }
}

export default new CheckInController()
