import express from "express";
const router = express.Router();

import { signin, signup, addProduct} from "../controllers/admin.js";
import {upload} from "../uploads/upload.js"
import auth from "../middleware/auth.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.post('/add-product', addProduct);//Should be Authorized Admin I will Add Later
// router.post('/remove-product', auth, removeProduct);

router.post("/upload",upload);

export default router;
