import { addDays, subDays, addHours } from 'date-fns';
import request from 'supertest';

import app from '../../src/app';
import { Car } from '../../src/app/models/Car';
import {
  ManufacturerFactory,
  BranchFactory,
  ModelFactory,
  CarFactory,
  BookingFactory,
} from '../factories';
import TestUtils from '../utils/TestUtils';

describe('Booking', () => {
  beforeAll(async () => {
    await TestUtils.connect();
  });

  beforeEach(async () => {
    await TestUtils.truncate();
  });

  afterAll(async () => {
    await TestUtils.disconnect();
  });

  const preFactory = async (): Promise<Car> => {
    const manufacturer = await ManufacturerFactory.create(
      TestUtils.connection,
      {},
    );

    const branch = await BranchFactory.create(TestUtils.connection, {});

    const model = await ModelFactory.create(TestUtils.connection, {
      manufacturer_id: manufacturer.id,
    });

    return CarFactory.create(TestUtils.connection, {
      branch_id: branch.id,
      model_id: model.id,
    });
  };

  it('should index bookings', async () => {
    const car = await preFactory();

    await BookingFactory.create(TestUtils.connection, {
      start_date: addDays(new Date(), 1),
      end_date: addDays(new Date(), 5),
      car_id: car.id,
    });

    await BookingFactory.create(TestUtils.connection, {
      start_date: addDays(new Date(), 10),
      end_date: addDays(new Date(), 20),
      car_id: car.id,
    });

    const response = await request(app)
      .get('/bookings')
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it('should not accept wrong property to store', async () => {
    const response = await request(app)
      .post('/bookings')
      .send({
        email: 'test@wrong.com',
        password: '123123',
      });

    expect(response.status).toBe(400);
  });

  it('should not accept start_date in the past', async () => {
    const car = await preFactory();

    const response = await request(app)
      .post('/bookings')
      .send({
        start_date: subDays(new Date(), 1),
        end_date: addDays(new Date(), 1),
        car_id: car.id,
      });

    expect(response.status).toBe(400);
  });

  it('should not accept end_date to be more than 3 days after start_date', async () => {
    const car = await preFactory();

    const response = await request(app)
      .post('/bookings')
      .send({
        start_date: subDays(new Date(), 1),
        end_date: addDays(new Date(), 5),
        car_id: car.id,
      });

    expect(response.status).toBe(400);
  });

  it('should not accept start_date already booked when inserting', async () => {
    const car = await preFactory();

    await BookingFactory.create(TestUtils.connection, {
      start_date: addDays(new Date(), 10),
      end_date: addDays(new Date(), 12),
      car_id: car.id,
    });

    const response = await request(app)
      .post('/bookings')
      .send({
        start_date: addDays(new Date(), 11),
        end_date: addDays(new Date(), 13),
        car_id: car.id,
      });

    expect(response.status).toBe(401);
  });

  it('should not accept end_date already booked', async () => {
    const car = await preFactory();

    await BookingFactory.create(TestUtils.connection, {
      start_date: addDays(new Date(), 20),
      end_date: addDays(new Date(), 22),
      car_id: car.id,
    });

    const response = await request(app)
      .post('/bookings')
      .send({
        start_date: addDays(new Date(), 19),
        end_date: addDays(new Date(), 21),
        car_id: car.id,
      });

    expect(response.status).toBe(401);
  });

  it('should book a reservation', async () => {
    const car = await preFactory();

    const response = await request(app)
      .post('/bookings')
      .send({
        start_date: addDays(new Date(), 20),
        end_date: addDays(new Date(), 22),
        car_id: car.id,
      });

    expect(response.status).toBe(200);
    expect(response.body.booking.identifiers[0]).toHaveProperty('id');
  });

  it('should show a booking', async () => {
    const car = await preFactory();

    const booking = await BookingFactory.create(TestUtils.connection, {
      start_date: addDays(new Date(), 20),
      end_date: addDays(new Date(), 22),
      car_id: car.id,
    });

    const response = await request(app)
      .get(`/bookings/${booking.id}`)
      .send();

    expect(response.status).toBe(200);

    delete response.body.booking.checkin_at;
    delete response.body.booking.checkout_at;

    expect(response.body).toEqual({
      booking: {
        id: expect.any(Number),
        start_date: expect.any(String),
        end_date: expect.any(String),
        car_id: expect.any(Number),
        created_at: expect.any(String),
        updated_at: expect.any(String),
        car: {
          id: expect.any(Number),
          license_plate: expect.any(String),
          color: expect.any(String),
          model_id: expect.any(Number),
          branch_id: expect.any(Number),
          created_at: expect.any(String),
          updated_at: expect.any(String),
          model: {
            id: expect.any(Number),
            name: expect.any(String),
            image: expect.any(String),
            manufacturer_id: expect.any(Number),
            created_at: expect.any(String),
            updated_at: expect.any(String),
            manufacturer: {
              id: expect.any(Number),
              name: expect.any(String),
              created_at: expect.any(String),
              updated_at: expect.any(String),
            },
          },
          branch: {
            id: expect.any(Number),
            city: expect.any(String),
            created_at: expect.any(String),
            updated_at: expect.any(String),
          },
        },
      },
    });
  });

  it('should not accept wrong property to update', async () => {
    const car = await preFactory();

    const booking = await BookingFactory.create(TestUtils.connection, {
      start_date: addDays(new Date(), 20),
      end_date: addDays(new Date(), 22),
      car_id: car.id,
    });

    const response = await request(app)
      .put(`/bookings/${booking.id}`)
      .send({
        start_date: '',
        end_date: addDays(new Date(), 25),
        car_id: car.id,
      });

    expect(response.status).toBe(400);
  });

  it('should not accept wrong id', async () => {
    const car = await preFactory();

    await BookingFactory.create(TestUtils.connection, {
      start_date: addDays(new Date(), 20),
      end_date: addDays(new Date(), 22),
      car_id: car.id,
    });

    const response = await request(app)
      .put(`/bookings/${99999999}`)
      .send({
        start_date: addDays(new Date(), 1),
        end_date: addDays(new Date(), 2),
        car_id: car.id,
      });

    expect(response.status).toBe(401);
  });

  it('should not accept start_date with more than 3 days before current end_date when updating', async () => {
    const car = await preFactory();

    const booking = await BookingFactory.create(TestUtils.connection, {
      start_date: addDays(new Date(), 20),
      end_date: addDays(new Date(), 22),
      car_id: car.id,
    });

    const response = await request(app)
      .put(`/bookings/${booking.id}`)
      .send({
        start_date: addDays(new Date(), 1),
      });

    expect(response.status).toBe(401);
  });

  it('should not accept end_date with more than 3 days after current start_date when updating', async () => {
    const car = await preFactory();

    const booking = await BookingFactory.create(TestUtils.connection, {
      start_date: addDays(new Date(), 20),
      end_date: addDays(new Date(), 22),
      car_id: car.id,
    });

    const response = await request(app)
      .put(`/bookings/${booking.id}`)
      .send({
        end_date: addDays(new Date(), 30),
      });

    expect(response.status).toBe(401);
  });

  it('should not to update booking when start_date is wthin a range of another booking', async () => {
    const car = await preFactory();

    await BookingFactory.create(TestUtils.connection, {
      start_date: addDays(new Date(), 20),
      end_date: addDays(new Date(), 22),
      car_id: car.id,
    });

    const booking = await BookingFactory.create(TestUtils.connection, {
      start_date: addDays(new Date(), 23),
      end_date: addHours(addDays(new Date(), 23), 10),
      car_id: car.id,
    });

    const response = await request(app)
      .put(`/bookings/${booking.id}`)
      .send({
        start_date: addDays(new Date(), 21),
      });

    expect(response.status).toBe(401);
  });

  it('should not to update booking when end_date is wthin a range of another booking', async () => {
    const car = await preFactory();

    await BookingFactory.create(TestUtils.connection, {
      start_date: addDays(new Date(), 20),
      end_date: addDays(new Date(), 22),
      car_id: car.id,
    });

    const booking = await BookingFactory.create(TestUtils.connection, {
      start_date: addDays(new Date(), 19),
      end_date: addHours(addDays(new Date(), 19), 10),
      car_id: car.id,
    });

    const response = await request(app)
      .put(`/bookings/${booking.id}`)
      .send({
        end_date: addDays(new Date(), 21),
      });

    expect(response.status).toBe(401);
  });

  it('should not accept update to more than 3 days', async () => {
    const car = await preFactory();

    const booking = await BookingFactory.create(TestUtils.connection, {
      start_date: addDays(new Date(), 20),
      end_date: addDays(new Date(), 22),
      car_id: car.id,
    });

    const response = await request(app)
      .put(`/bookings/${booking.id}`)
      .send({
        end_date: addDays(new Date(), 20),
        start_date: addDays(new Date(), 30),
      });

    expect(response.status).toBe(400);
  });

  it('should not accept checkin_at before currently booked start_date', async () => {
    const car = await preFactory();

    const booking = await BookingFactory.create(TestUtils.connection, {
      start_date: addDays(new Date(), 2),
      end_date: addDays(new Date(), 4),
      car_id: car.id,
    });

    const response = await request(app)
      .put(`/bookings/${booking.id}`)
      .send({
        checkin_at: addDays(new Date(), 1),
      });

    expect(response.status).toBe(401);
  });

  it('should not accept checkout_at before currently booked end_date', async () => {
    const car = await preFactory();

    const booking = await BookingFactory.create(TestUtils.connection, {
      start_date: addDays(new Date(), 1),
      end_date: addDays(new Date(), 3),
      car_id: car.id,
    });

    const response = await request(app)
      .put(`/bookings/${booking.id}`)
      .send({
        checkout_at: addDays(new Date(), 1),
      });

    expect(response.status).toBe(401);
  });

  it('should register checkin_at', async () => {
    const car = await preFactory();

    const booking = await BookingFactory.create(TestUtils.connection, {
      start_date: addDays(new Date(), 23),
      end_date: addDays(new Date(), 25),
      car_id: car.id,
    });

    const response = await request(app)
      .put(`/bookings/${booking.id}`)
      .send({
        checkin_at: addDays(addHours(new Date(), 1), 23),
      });

    expect(response.status).toBe(200);
  });

  it('should register checkout_at', async () => {
    const car = await preFactory();

    const booking = await BookingFactory.create(TestUtils.connection, {
      start_date: addDays(new Date(), 24),
      end_date: addDays(new Date(), 25),
      car_id: car.id,
    });

    const response = await request(app)
      .put(`/bookings/${booking.id}`)
      .send({
        checkout_at: addDays(new Date(), 25),
      });

    expect(response.status).toBe(200);
  });

  it('should delete booking', async () => {
    const car = await preFactory();

    const booking = await BookingFactory.create(TestUtils.connection, {
      start_date: addDays(new Date(), 24),
      end_date: addDays(new Date(), 25),
      car_id: car.id,
    });

    const response = await request(app)
      .delete(`/bookings/${booking.id}`)
      .send();

    expect(response.status).toBe(200);
  });
});
