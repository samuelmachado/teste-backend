import { Booking } from '@models/Booking';
import { Branch } from '@models/Branch';
import { Manufacturer } from '@models/Manufacturer';
import { Model } from '@models/Model';
import faker from 'faker';
import { Connection } from 'typeorm';

import { Car } from '../src/app/models/Car';

export const CarFactory = {
  build: (attrs: Partial<Car> = {}): Car => {
    const carAttrs: Partial<Car> = {
      license_plate: faker.random.alphaNumeric(7),
      color: faker.commerce.color(),
      ...attrs,
    };

    return new Car(carAttrs);
  },
  create: async (
    connection: Connection,
    attrs: Partial<Car> = {},
  ): Promise<Car> => {
    const car = CarFactory.build(attrs);
    return connection.manager.save(car);
  },
};

export const BranchFactory = {
  build: (attrs: Partial<Branch> = {}): Branch => {
    const branchAttrs: Partial<Branch> = {
      city: faker.address.city(),
      ...attrs,
    };

    return new Branch(branchAttrs);
  },
  create: async (
    connection: Connection,
    attrs: Partial<Branch> = {},
  ): Promise<Branch> => {
    const branch = BranchFactory.build(attrs);
    return connection.manager.save(branch);
  },
};

export const ManufacturerFactory = {
  build: (attrs: Partial<Manufacturer> = {}): Manufacturer => {
    const manufacturerAttrs: Partial<Manufacturer> = {
      // name: vehicle.manufacturer(),
      name: faker.random.word(),
      ...attrs,
    };

    return new Manufacturer(manufacturerAttrs);
  },
  create: async (
    connection: Connection,
    attrs: Partial<Manufacturer> = {},
  ): Promise<Manufacturer> => {
    const manufacturer = ManufacturerFactory.build(attrs);
    return connection.manager.save(manufacturer);
  },
};

export const ModelFactory = {
  build: (attrs: Partial<Model> = {}): Model => {
    const modelAttrs: Partial<Model> = {
      // name: vehicle.model(),
      name: faker.random.word(),
      image: faker.random.word(),
      ...attrs,
    };

    return new Model(modelAttrs);
  },
  create: async (
    connection: Connection,
    attrs: Partial<Model> = {},
  ): Promise<Model> => {
    const model = ModelFactory.build(attrs);
    return connection.manager.save(model);
  },
};

export const BookingFactory = {
  build: (attrs: Partial<Booking> = {}): Booking => {
    const bookingAttrs: Partial<Booking> = {
      ...attrs,
    };

    return new Booking(bookingAttrs);
  },
  create: async (
    connection: Connection,
    attrs: Partial<Booking> = {},
  ): Promise<Booking> => {
    const booking = BookingFactory.build(attrs);
    return connection.manager.save(booking);
  },
};
