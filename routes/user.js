import express from "express";
const router = express.Router();

import { signin, signup, addToCart, getCart, removeFromCart} from "../controllers/user.js";
import {placeOrder, getOrderHistory, getOrderDetails} from "../controllers/order.js"
import auth from "../middleware/auth.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.post('/add-to-cart', auth, addToCart);
router.post('/remove-from-cart', auth, removeFromCart);
router.get('/get-cart', auth, getCart);

router.post('/place-order', auth, placeOrder);

router.get('/history', auth, getOrderHistory);

// Get order details by ID
router.get('/order-details/:orderId', auth, getOrderDetails);

export default router;