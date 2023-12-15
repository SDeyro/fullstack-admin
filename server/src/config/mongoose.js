import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

/* DATA IMPORT */
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import ProductStat from '../models/ProductStat.js';
import OverallStat from '../models/OverallStat.js';
import AffiliateStat from '../models/AffiliateStat.js';
import {
  dataProductStat,
  dataUser,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from '../data/index.js';

const connecToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    /* ONLY ADD DATA ONETIME */
    // ProductStat.insertMany(dataProductStat);
    // User.insertMany(dataUser);
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    // AffiliateStat.insertMany(dataAffiliateStat);

    console.log('Connected to MongoDB...');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connecToDB;
