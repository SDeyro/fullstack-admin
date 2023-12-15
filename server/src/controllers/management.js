import mongoose from 'mongoose';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import { generateSortFormat, generateSearchQuery } from '../lib/pagination.js';

const getAdmin = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, sort, search = '' } = req.query;

    // Sorting
    const sortFormat = generateSortFormat(sort);

    // Search Filter
    const searchQuery = generateSearchQuery(search, { role: 'admin' });

    const result = await User.find(searchQuery)
      .sort(sortFormat)
      .skip(page * pageSize)
      .limit(pageSize)
      .select('-password');

    if (!result) {
      return result.status(404).json({ message: 'User not found' });
    }

    // Count the items from the query
    const totalItems = await User.countDocuments(searchQuery);

    const meta = {
      page: parseInt(page),
      pageSize,
      totalPages: Math.ceil(totalItems / pageSize),
      totalItems,
      sort: sortFormat,
    };

    res.status(200).json({ result, meta });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'affiliatestats',
          localField: '_id',
          foreignField: 'userId',
          as: 'affiliateStats',
        },
      },
      { $unwind: '$affiliateStats' },
    ]);

    const salesTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map(id => {
        return Transaction.findById(id).populate({
          path: 'userId',
          select: 'name',
        });
      })
    );

    const filteredSalesTransactions = salesTransactions.filter(
      transaction => transaction !== null
    );

    if (!userWithStats || !salesTransactions) {
      res.status(404).json({ message: 'Something went wrong' });
    }

    res.status(200).json({
      user: userWithStats[0],
      salesTransactions: filteredSalesTransactions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { getAdmin, getUserPerformance };
