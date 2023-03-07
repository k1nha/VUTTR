import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { router } from '@shared/http/routes';
import AppError from '@shared/errors/AppError';

dotenv.config();

const PORT = process.env.PORT || 3030;

const app = express();

app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${error.message}}`,
    });
  },
);

app.listen(PORT, () => {
  console.log(`[SERVER] Server is listening on ${PORT}`);
});
