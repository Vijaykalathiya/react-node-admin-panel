import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TransactionScehma = new  mongoose.Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        cost: Number,
        products: [{ type: Schema.Types.ObjectId, of: Number }],
    },
    {timestamps: true}
);

const Transaction = mongoose.model("Transaction", TransactionScehma);
export default Transaction;