import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import OverallStat from '../models/OverallStat.js';

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    // Hardcoded Values
    const currentMonth = 'November';
    const currentYear = 2021;
    const currentDay = '2021-11-15';

    /* Recent Transaction */
    // const transactions = await Transaction.find({})
    //   .limit(50)
    //   .sort({ createdAt: -1 });

    /* Overall Stat */
    const overallStat = await OverallStat.find({ year: currentYear });

    if (!overallStat) {
      return res.status(404).json({ message: 'Something went wrong' });
    }

    const {
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStat = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStat,
      // transactions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
export { getUser, getDashboardStats };
