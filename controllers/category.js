/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management
 */

import CategoryModal from "../models/category.js";

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get a list of categories
 *     tags: [Category]
 *     responses:
 *       '200':
 *         description: List of categories
 *         content:
 *           application/json:
 *             example:
 *               - _id: 'category_id'
 *                 name: 'Electronics'
 *               - _id: 'another_category_id'
 *                 name: 'Clothing'
 *       '500':
 *         description: Error fetching categories
 */
// Get a list of categories
export const categories =async (req, res) => {
    try {
      const categories = await CategoryModal.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching categories' });
    }
  };