import path from 'node:path';
import { pathToFileURL } from 'node:url';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import ConnectDb from './src/config/dbconfig.js';
import authRoutes from './src/routes/auth.routes.js';
import otpRoutes from './src/routes/rotp.routes.js'

dotenv.config();

const PORT = process.env.UB_PORT || 5000;
const MongoDbUri = process.env.MONGODB_URI;

const allowedOrigins = [
  'http://localhost:5173',
  'https://undobharat.pages.dev',
  'https://undobharat.vercel.app'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    const isAllowedOrigin =
      allowedOrigins.includes(origin) ||
      /^https:\/\/([a-z0-9-]+\.)*vercel\.app$/i.test(origin);

    if (isAllowedOrigin) {
      return callback(null, true);
    }

    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  optionsSuccessStatus: 204
};

export const createApp = ({ connectDb = true } = {}) => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.set('trust proxy', 1);
  app.use(cors(corsOptions));
  app.options(/(.*)/, cors(corsOptions));

  if (connectDb) {
    ConnectDb(MongoDbUri);
  }

  app.use('/api', authRoutes);
  app.use('/api', otpRoutes);

  app.get('/', (req, res) => {
    res.send('UndoBharat API Is Running..');
  });
  return app;
};

const isDirectExecution =
  process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (isDirectExecution) {
  const app = createApp();
  app.listen(PORT, () => {
    console.log(`Undobharat Server Running In Port ${PORT}`);
  });
}
