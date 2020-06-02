import { Router } from 'express';

import BookingController from './app/controllers/BookingController';
import CarController from './app/controllers/CarController';

const routes = Router();

routes.post('/bookings', BookingController.store);
routes.get('/bookings', BookingController.index);
routes.get('/bookings/:id', BookingController.show);
routes.put('/bookings/:id', BookingController.update);
routes.delete('/bookings/:id', BookingController.destroy);

routes.post('/cars', CarController.store);
routes.get('/cars', CarController.index);
routes.get('/cars/:id', CarController.show);
routes.put('/cars/:id', CarController.update);
routes.delete('/cars/:id', CarController.destroy);

export default routes;
