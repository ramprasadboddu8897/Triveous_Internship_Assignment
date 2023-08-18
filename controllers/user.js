/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = 'test';
/**
 * @swagger
 * /user/signin:
 *   post:
 *     summary: Sign in a user
 *     tags: [User]
 *     requestBody:
 *       description: User credentials for sign-in
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User signed in successfully
 *         content:
 *           application/json:
 *             example:
 *               result: { _id: 'user_id', email: 'user@example.com', name: 'John Doe' }
 *               token: 'jwt_token'
 */

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [User]
 *     requestBody:
 *       description: User information for sign-up
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *     responses:
 *       '201':
 *         description: User signed up successfully
 *         content:
 *           application/json:
 *             example:
 *               result: { _id: 'user_id', email: 'user@example.com', name: 'John Doe' }
 *               token: 'jwt_token'
 */

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};

/**
 * @swagger
 * /user/add-to-cart:
 *   post:
 *     summary: Add a product to the user's cart
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Product information to add to the cart
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *             required:
 *               - productId
 *               - quantity
 *     responses:
 *       '200':
 *         description: Product added to cart successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Product added to cart
 */

// Add a product to the user's cart
export const addToCart = async (req, res) => {
  const userId = req.userId; // Assuming you're using JWT authentication
  const { productId, quantity } = req.body;

  try {
    const user = await UserModal.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const existingCartItem = user.cart.find(item => item.productId.toString() === productId);
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();
    res.json({ message: 'Product added to cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product to cart' });
  }
};

/**
 * @swagger
 * /user/remove-from-cart:
 *   post:
 *     summary: Remove a product from the user's cart
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Product information to remove from the cart
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *             required:
 *               - productId
 *     responses:
 *       '200':
 *         description: Product removed from cart successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Product removed from cart
 */

// Remove a product from the user's cart
export const removeFromCart = async (req, res) => {
  const userId = req.user.id; // Assuming you're using JWT authentication
  const { productId } = req.body;

  try {
    const user = await UserModal.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    await user.save();
    res.json({ message: 'Product removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing product from cart' });
  }
};

/**
 * @swagger
 * /user/get-cart:
 *   get:
 *     summary: Get the user's cart
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully fetched the user's cart
 *         content:
 *           application/json:
 *             example:
 *               - productId: 'product_id'
 *                 quantity: 2
 *               - productId: 'another_product_id'
 *                 quantity: 1
 */

// Get the user's cart
export const getCart = async (req, res) => {
  const userId = req.user.id; // Assuming you're using JWT authentication

  try {
    const user = await UserModal.findById(userId).populate('cart.productId');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart' });
  }
};
