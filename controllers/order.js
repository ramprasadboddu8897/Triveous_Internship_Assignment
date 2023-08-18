/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order management
 */

import OrderModal from "../models/order.js";

/**
 * @swagger
 * /place-order:
 *   post:
 *     summary: Place an order
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Products for order placement
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                 required:
 *                   - productId
 *                   - quantity
 *     responses:
 *       '200':
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Order placed successfully
 *       '500':
 *         description: Error placing order
 */

// Get a list of categories
export const placeOrder = async (req, res) => {
    try {
      const userId = req.userId; // Assuming you're using JWT authentication
      const { products } = req.body;
      
      // Calculate the total amount based on products and quantities
      const totalAmount = products.reduce((total, product) => {
        const productPrice = getProductPriceFromDatabase(product.productId); // Implement this function
        return total + productPrice * product.quantity;
      }, 0);
  
      // Create the order
      const order = new OrderModal({
        userId,
        products,
        totalAmount,
      });
  
      await order.save();
      res.json({ message: 'Order placed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error placing order' });
    }
  };

/**
 * @swagger
 * /history:
 *   get:
 *     summary: Get the order history of the authenticated user
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Order history fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               - _id: 'order_id'
 *                 userId: 'user_id'
 *                 products:
 *                   - productId: 'product_id'
 *                     quantity: 2
 *                 totalAmount: 200
 *       '500':
 *         description: Error fetching order history
 */

export const getOrderHistory = async (req, res) => {
    try {
      const userId = req.userId; // Assuming you're using JWT authentication
      const orders = await OrderModal.find({ userId });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching order history' });
    }
  };  

/**
 * @swagger
 * /order-details/{orderId}:
 *   get:
 *     summary: Get detailed information of a specific order by its ID
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order
 *     responses:
 *       '200':
 *         description: Detailed information of the order
 *         content:
 *           application/json:
 *             example:
 *               _id: 'order_id'
 *               userId: 'user_id'
 *               products:
 *                 - productId: 'product_id'
 *                   quantity: 2
 *               totalAmount: 200
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Error fetching order details
 */  

export const getOrderDetails = async (req, res) => {
    try {
      const order = await OrderModal.findById(req.params.orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching order details' });
    }
  }; 