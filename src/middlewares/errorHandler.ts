import { Request, Response, NextFunction } from 'express';
import { IErrorResponse } from '../utils/types';

const errorHandler = (
  err: IErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка.' : message,
  });
};

export default errorHandler;
