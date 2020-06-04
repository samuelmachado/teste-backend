
const express = require('express');
const routes = express.Router();

const BookingController = require("./controllers/bookingController");
const CarController = require("./controllers/carController");
const CheckinController = require("./controllers/checkinController");
const CheckoutController = require("./controllers/checkoutController");

//rotas dos carros


//listagem de todos os carros
routes.get('/cars/list', CarController.listCars);
//listagem de todos os modelos
routes.get('/cars/listModel', CarController.listModels);

//listagem de todas reservas
routes.get('/bookings/list', BookingController.listBookings);
//criar reservas
routes.post('/booking/create', BookingController.createBooking);

//realizar checkin
routes.post('/checkin', CheckinController.createCheckin);
//listar datas de checkin
routes.get('/bookings/checkinData', CheckinController.listCheckin );

//realizar checkout
routes.post('/checkout', CheckoutController.createCheckout);
//listar datas de checkout
routes.get('/bookings/checkoutData', CheckoutController.listCheckout );

module.exports = routes;