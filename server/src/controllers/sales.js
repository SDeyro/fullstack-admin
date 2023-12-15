import OverallStat from '../models/OverallStat.js';

const getSales = async (req, res) => {
  try {
    const overallStats = await OverallStat.find({});

    if (!overallStats) {
      res.status(404).json({ message: 'No overall stats found' });
    }

    res.status(200).json(overallStats[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { getSales };
