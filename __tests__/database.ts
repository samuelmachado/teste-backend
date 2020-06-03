import { Container } from 'typedi'
import { Connection, createConnection, useContainer } from 'typeorm'

import { connectionOptions } from '@/loaders/TypeormLoader'

export const createDatabaseConnection = async (): Promise<Connection> => {
  useContainer(Container)
  return createConnection(connectionOptions)
}

export const closeDatabase = (connection: Connection) => connection.close()
