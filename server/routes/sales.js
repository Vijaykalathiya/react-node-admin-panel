import express from "express";
const router = express.Router();
import {getOverallStats} from '../controllers/sales.js'

router.get("/stat", getOverallStats);

export default router;