import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import connecToDB from './config/mongoose.js';

import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

/* CONFIGURATION */
dotenv.config({ path: '../.env' });
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

/* CONNECTION TO THE MONGODB */
connecToDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
