
import getCountryIso3 from 'country-iso-2-to-3';
import Product from "../models/Product.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $lookup: {
          from: "productstats",
          localField: "_id",
          foreignField: "productId",
          as: "stat",
        },
      },
    ]);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({role: "user"}).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    // received request with parms like currentPage, pageSize, sortField, search params
    const {search = "", sort = null, page = 1, pageSize = 25} = req.query;

    // the format for SORT is different from frontend to MongoDB, needs to convert it.
    const requiredSortFormat = () => {
      const parseSort = JSON.parse(sort);
      const convertSortFormat = {
        [parseSort.field]: (parseSort.sort == 'desc' ? -1 : 1),
      }
      return convertSortFormat;
    }
    const sortFormat = sort != "null" && Boolean(sort) ? requiredSortFormat() : {"updatedAt" : -1};
    const transactions = await Transaction.find({
      // $or: [
      //   { cost: { $regex: new RegExp(parseInt(search), "i") } },
      // ]
    }).sort(sortFormat).skip(page * pageSize).limit(pageSize);

    const total = await Transaction.countDocuments({
      name: {$regex: new RegExp(parseInt(search), "i")}
    });

    res.status(200).json({transactions, total});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeographys = async (req,res) => {
  try {
    const users = await User.find({});
    const mappedLocations = users.reduce((acc, {country}) => {
      const countryIn3Digit = getCountryIso3(country);
      if(!acc[countryIn3Digit]) {
        acc[countryIn3Digit] = 0;
      } 
      acc[countryIn3Digit]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(([country, count]) => {return {id: country, value: count}});
    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}