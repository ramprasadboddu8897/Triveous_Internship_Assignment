import express from "express";
const router = express.Router();

import { productByCategory, productByProductId } from "../controllers/product.js";
import auth from "../middleware/auth.js";

router.get("/:categoryId", productByCategory);
router.get("/:productId", productByProductId);

export default router;