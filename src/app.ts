import express, { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import ERROR_CODES from './utils/constants';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  (req as any).user = {
    _id: '680fe93a2b3c9df21e431a04',
  };
  next();
});

app.use(usersRouter);
app.use(cardsRouter);

app.use((req: Request, res: Response) => {
  res.status(ERROR_CODES.NOT_FOUND).send({ message: 'Not found' });
});

app.listen(+PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
