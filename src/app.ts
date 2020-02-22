import cors from 'cors';
import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';

import 'dotenv/config';
import 'express-async-errors';
import { createConnection, Connection } from 'typeorm';

import routes from './routes';

class App {
  public server: express.Application;

  public connection: Connection;

  constructor() {
    this.server = express();
    createConnection().then(connection => {
      this.connection = connection;
    });

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  private middlewares(): void {
    this.server.use(cors());
    this.server.use(express.json());
  }

  private routes(): void {
    this.server.use(routes);
  }

  exceptionHandler(): void {
    this.server.use(
      async (
        err: ErrorRequestHandler,
        req: Request,
        res: Response,
        next: NextFunction,
      ) => {
        if (process.env.NODE_ENV === 'development') {
          return res.status(500).json(err);
        }

        return res.status(500).json({ error: 'Internal server error' });
      },
    );
  }
}

export default new App().server;
