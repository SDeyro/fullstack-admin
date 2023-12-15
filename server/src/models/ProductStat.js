import mongoose from 'mongoose';

const productStatSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
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
});

const ProductStat = mongoose.model('productStat', productStatSchema);

export default ProductStat;
