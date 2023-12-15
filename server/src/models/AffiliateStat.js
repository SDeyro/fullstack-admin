import mongoose from 'mongoose';

const affiliateStatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  affiliateSales: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'transaction',
  },
});

const AffiliateStat = mongoose.model('affiliateStat', affiliateStatSchema);

export default AffiliateStat;
