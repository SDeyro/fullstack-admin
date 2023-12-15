import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    transactions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'transaction',
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'superadmin'],
      default: 'admin',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('user', userSchema);

export default User;
