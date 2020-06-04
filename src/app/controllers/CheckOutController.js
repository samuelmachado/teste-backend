import Schedule from '../models/Schedule'
import * as Yup from 'yup'
import { startOfHour, parseISO, isBefore, subHours } from 'date-fns'



class CheckOutController {
  async index (req, res){
  }

  async store (req, res) {
    const schema = Yup.object().shape({
      scheduleId: Yup.number().required(),
    })
    
    const { scheduleId }  = req.body

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Acessar com o id da reserva.' })
    }
    
    const canceledA =  true
 
    try{
      let schedule = await Schedule.findByPk( scheduleId )
      
      schedule = await schedule.update( {'canceledAt': true} )
       
      return res.json(schedule)
      
    }catch (error){
      console.log(error);
      
    }
  }
}

export default new CheckOutController()