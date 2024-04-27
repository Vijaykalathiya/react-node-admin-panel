import mongoose from "mongoose";

const OverAllStatSchema = new mongoose.Schema(
  {
    totalCustomer: Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [{
      month: String,
      totalSales: Number,
      totalUnits: Number,
    }],
    salesByCategory: {
        type: Map,
        of: Number
    }
  },
  { timestamps: true }
);

const OverallStat = mongoose.model("OverallStat", OverAllStatSchema);
export default OverallStat;