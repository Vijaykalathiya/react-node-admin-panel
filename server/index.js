import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

// start configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet()); // set security headers
app.use(helmet(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' })));
app.use(morgan('common')); // log requests to the console (common)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors);

// // main routes
// app.use("/client", clientRoute); // client including Products, Customer, Transaction and Geography routes
// app.use("/general", GeneralRoute); // dashboard and user routes
// app.use("/management", ManagementRoute); // admin and performance routes
// app.use("/sales", SalesRoute);

// connect to MongoDB database
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        const server = app.listen(process.env.MONGO_PORT || 8090, () => {
            console.log(`Server running on port ${server.address().port}`);
        });
    }).catch((err) => {
        console.error("Error connecting to MongoDB: ", err);
});