import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import user_router from './routers/user.router';
import pickup_router from './routers/pickup.router';
import collection_router from './routers/collection.router';
import admin_router from './routers/admin.router';

const app = express();

const allowedOrigins = ['http://localhost:4200'];
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/users', user_router);
app.use('/pickups', pickup_router);
app.use('/collections', collection_router);
app.use('/admin', admin_router);

// Error Handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start Server
const PORT = 5800;
app.listen(PORT, () => {
  console.log(`Server is running at port:${PORT}`);
});
