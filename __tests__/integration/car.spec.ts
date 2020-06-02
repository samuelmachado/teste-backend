import request from 'supertest';

import app from '../../src/app';
import { Branch } from '../../src/app/models/Branch';
import { Model } from '../../src/app/models/Model';
import {
  ManufacturerFactory,
  BranchFactory,
  ModelFactory,
  CarFactory,
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

  const preFactory = async (): Promise<{ branch: Branch; model: Model }> => {
    const manufacturer = await ManufacturerFactory.create(
      TestUtils.connection,
      {},
    );

    const branch = await BranchFactory.create(TestUtils.connection, {});

    const model = await ModelFactory.create(TestUtils.connection, {
      manufacturer_id: manufacturer.id,
    });

    return { branch, model };
  };

  it('should index cars', async () => {
    const { branch, model } = await preFactory();

    await CarFactory.create(TestUtils.connection, {
      branch_id: branch.id,
      model_id: model.id,
    });

    await CarFactory.create(TestUtils.connection, {
      branch_id: branch.id,
      model_id: model.id,
    });

    const response = await request(app)
      .get('/cars')
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it('should not accept wrong properties to insert a car', async () => {
    const response = await request(app)
      .post(`/cars`)
      .send({
        license_plate: 'ABC1234',
      });

    expect(response.status).toBe(400);
  });

  it('should not accept duplicate license_plate', async () => {
    const { branch, model } = await preFactory();

    const car = await CarFactory.create(TestUtils.connection, {
      branch_id: branch.id,
      model_id: model.id,
    });

    const response = await request(app)
      .post('/cars')
      .send({
        license_plate: car.license_plate,
        color: 'blue',
        branch_id: branch.id,
        model_id: model.id,
      });

    expect(response.status).toBe(401);
  });

  it('should inser a car', async () => {
    const { branch, model } = await preFactory();

    const response = await request(app)
      .post('/cars')
      .send({
        license_plate: 'ABC1234',
        color: 'blue',
        branch_id: branch.id,
        model_id: model.id,
      });

    expect(response.status).toBe(200);
  });

  it('should show a car', async () => {
    const { branch, model } = await preFactory();

    const car = await CarFactory.create(TestUtils.connection, {
      branch_id: branch.id,
      model_id: model.id,
    });

    const response = await request(app)
      .get(`/cars/${car.id}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
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
    });
  });

  it('should not accept wrong properties to update a car', async () => {
    const { branch, model } = await preFactory();

    const car = await CarFactory.create(TestUtils.connection, {
      branch_id: branch.id,
      model_id: model.id,
    });

    const response = await request(app)
      .put(`/cars/${car.id}`)
      .send({
        license_plate: '423432423',
      });

    expect(response.status).toBe(400);
  });

  it('should not update if car doesnt exists', async () => {
    const response = await request(app)
      .put(`/cars/${99999999}`)
      .send({
        license_plate: 'ABC1239',
      });

    expect(response.status).toBe(401);
  });

  it('should update a car', async () => {
    const { branch, model } = await preFactory();

    const car = await CarFactory.create(TestUtils.connection, {
      branch_id: branch.id,
      model_id: model.id,
    });

    const response = await request(app)
      .put(`/cars/${car.id}`)
      .send({
        license_plate: 'A1B2C34',
      });

    expect(response.status).toBe(200);
  });

  it('should delete a car', async () => {
    const { branch, model } = await preFactory();

    const car = await CarFactory.create(TestUtils.connection, {
      branch_id: branch.id,
      model_id: model.id,
    });

    const response = await request(app)
      .delete(`/cars/${car.id}`)
      .send();

    expect(response.status).toBe(200);
  });
});
