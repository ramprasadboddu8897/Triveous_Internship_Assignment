import express from "express";
const router = express.Router();

import { categories } from "../controllers/category.js";
// import auth from "../middleware/auth.js";

router.get("/", categories);

export default router;