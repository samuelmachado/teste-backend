import { EntityRepository, Repository } from 'typeorm'

import { Reservation } from '@/database/models'

@EntityRepository(Reservation)
export default class ReservationRepository extends Repository<Reservation> {}
