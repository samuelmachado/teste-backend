import {  isBefore } from 'date-fns'
import Schedule from '../models/Schedule'

export default async (WithdrawalDate, DeliveryDate, CarId) => {

  const schedules = await Schedule.findAll({
    where: { CarId, canceledAt: null  }
  })

  let create = true
  if(Object.values(schedules).length === 0) {
    return true
  }
  schedules.map((schedule) => {
    
    if (isBefore(WithdrawalDate, schedule.withdrawalDate) & isBefore(DeliveryDate, schedule.withdrawalDate) & create == true){
      console.log("passou1");
      return create = true
    }
    if (isBefore(schedule.deliveryDate, WithdrawalDate) & isBefore(schedule.deliveryDate, DeliveryDate) & create == true){
      console.log("passou2");
      return create = true
    }
    create = false
  })
  return create
  
}