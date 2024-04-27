import OverallStat from "../models/OverallStat.js";

export const getOverallStats = async (req, res) => {
  try {
    const overview = await OverallStat.find();
    res.status(200).json(overview);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
