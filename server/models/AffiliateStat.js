import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AffiliateStatSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    affiliateSales: {
        type:[Schema.Types.ObjectId], ref: "Transaction"
  }
  },
  { timestamps: true }
);

const AffiliateStat = mongoose.model("AffiliateStat", AffiliateStatSchema);
export default AffiliateStat;

