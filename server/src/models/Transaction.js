import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    cost: {
      type: String,
      required: true,
    },
    products: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'product',
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('transaction', transactionSchema);

export default Transaction;
