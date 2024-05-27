import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import generalRoutes from './routes/general.js';
import clientRoute from './routes/client.js';
import SalesRoute from './routes/sales.js'
import ManagementRoute from './routes/management.js';

// managing the data
import User from './models/User.js';
import Product from './models/Product.js';
import ProductStat from './models/ProductStat.js'
import Transaction from './models/Transaction.js';
import OverallStat from './models/OverallStat.js';
import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat } from './data/index.js';
import AffiliateStat from './models/AffiliateStat.js';

// start configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// // main routes
app.use("/client", clientRoute); // client including Products, Customer, Transaction and Geography routes
app.use("/general", generalRoutes); // dashboard and user routes
app.use("/management", ManagementRoute); // admin and performance routes
app.use("/sales", SalesRoute);

// connect to MongoDB database
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        const server = app.listen(process.env.MONGO_PORT || 8090, () => {
            console.log(`Server running on port ${server.address().port}`);
        });

        // mocking data when server will start.
        // User.insertMany(dataUser);
        // Product.insertMany(dataProduct);
        // ProductStat.insertMany(dataProductStat);
        // Transaction.insertMany(dataTransaction);
        // OverallStat.insertMany(dataOverallStat);
        // AffiliateStat.insertMany(dataAffiliateStat);
    }).catch((err) => {
        console.error("Error connecting to MongoDB: ", err);
});