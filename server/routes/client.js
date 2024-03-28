import express from "express";
const router = express.Router();
import { getUser, createUser } from "../controllers/client.js";

// @route   GET api/users/:id
// @desc    Get user by ID
// @access  Public
router.get("/:id", getUser);

// @route   POST api/users
// @desc    Create a new user
// @access  Public
router.post("/", createUser);

export default router;