import express from "express";
import cors from "cors";
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './modules/auth/auth.routes.js';
import errorHandler from './middlewares/error.middleware.js';

dotenv.config();
const app = express();

/* ================== GLOBAL MIDDLEWARE ================== */

// parse json body
app.use(express.json());
// parse form-data / x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// CORS
app.use(cors());

// log request (dev only)
if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
}

app.use('/api/auth', authRoutes);


/* ================== NOT FOUND ================== */

app.use((req, res) => {
  res.status(404).json({ message: 'API not found' });
});

app.use(errorHandler);
export default app;
