import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import path from 'path';
import { errorHandler } from './middlewares/error-handler';

import { authRouter } from './routes/auth';
import { sourceRouter } from './routes/source';
import { brandRouter } from './routes/brand';

const app = express();
app.set('trust_proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

// use routers here
app.use(authRouter);
app.use(sourceRouter);
app.use(brandRouter);

// add logic for front end routing here
if (process.env.NODE_ENV === 'production') {
  // Express will server up production assets
  app.use(express.static('client/build'));

  //Express will server up index.html if it doesn't recognize the route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(errorHandler);

export { app };
