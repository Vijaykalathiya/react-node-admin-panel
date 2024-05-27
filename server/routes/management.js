import express from "express";
import { getAdmin, getPerformanceById } from '../controllers/management.js';

const router = express.Router();

router.get("/admins", getAdmin);
router.get("/performance/:id", getPerformanceById);

export default router;
