import Product from '../models/Product.js';
import ProductStat from '../models/ProductStat.js';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

import { generateSortFormat, generateSearchQuery } from '../lib/pagination.js';

import getCountryISO3 from 'country-iso-2-to-3';

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    if (!products) {
      res.status(404).json({ message: 'Products not found' });
    }

    const productWithStats = await Promise.all(
      products.map(async product => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productWithStats);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getCustomers = async (req, res) => {
  try {
    const { page = 0, pageSize = 10, sort, search } = req.query;

    // Sorting
    const sortFormat = generateSortFormat(sort);

    // Search Filter
    const searchQuery = generateSearchQuery(search, { role: 'user' });

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
      search,
    };

    res.status(200).json({ result, meta });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getTransactions = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, sort, search = '' } = req.query;

    // Sorting
    const sortFormat = generateSortFormat(sort);

    // Search Filter
    const searchQuery = generateSearchQuery(search);

    const result = await Transaction.find(searchQuery)
      .sort(sortFormat)
      .skip(page * pageSize)
      .limit(pageSize)
      .populate('userId');

    if (!result) {
      return result.status(404).json({ message: 'Transaction not found' });
    }

    // Count the items from the query
    const totalItems = await Transaction.countDocuments(searchQuery);

    const meta = {
      page: parseInt(page),
      pageSize,
      totalPages: Math.ceil(totalItems / pageSize),
      totalItems,
      sort: sortFormat,
      search,
    };

    res.status(200).json({ result, meta });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getGeography = async (req, res) => {
  try {
    const users = await User.find({});

    if (!users) {
      res.status(404).json({ message: 'User not found' });
    }

    // Converts the state property (e.g. "ID" into "IND")
    const mappedLocation = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryISO3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocation = Object.entries(mappedLocation).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { getProducts, getCustomers, getTransactions, getGeography };
