import mongoose from 'mongoose';

const overallStatSchema = new mongoose.Schema(
  {
    totalCustomers: {
      type: Number,
      required: true,
    },
    yearlySalesTotal: {
      type: Number,
      required: true,
    },
    yearlyTotalSoldUnits: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    salesByCategory: {
      type: Map,
      of: Number,
    },
  },
  {
    timestamps: true,
  }
);

const OverallStat = mongoose.model('overallStats', overallStatSchema);

export default OverallStat;
