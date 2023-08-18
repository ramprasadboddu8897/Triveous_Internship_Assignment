/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management
 */
import ProductModal from "../models/product.js";

/**
 * @swagger
 * /category/{categoryId}:
 *   get:
 *     summary: Get a list of products based on category ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category
 *     responses:
 *       '200':
 *         description: A list of products based on the category ID
 *         content:
 *           application/json:
 *             example:
 *               - _id: 'product_id'
 *                 title: 'Product 1'
 *                 price: 100
 *                 description: 'Product description'
 *                 availability: true
 *               - _id: 'another_product_id'
 *                 title: 'Product 2'
 *                 price: 150
 *                 description: 'Another product description'
 *                 availability: false
 *       '500':
 *         description: Error fetching products
 */

// Get a list of Products Based on CategoryId
export const productByCategory =async (req, res) => {
    try {
      const products = await ProductModal.find({ categoryId: req.params.categoryId });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products' });
    }
  };

/**
 * @swagger
 * /category/{categoryId}/product/{productId}:
 *   get:
 *     summary: Get detailed information of a specific product by its ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product
 *     responses:
 *       '200':
 *         description: Detailed information of the product
 *         content:
 *           application/json:
 *             example:
 *               _id: 'product_id'
 *               title: 'Product 1'
 *               price: 100
 *               description: 'Product description'
 *               availability: true
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Error fetching product details
 */

// Get product From productID
export const productByProductId = async (req, res) => {
    try {
      const product = await ProductModal.findById(req.params.productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product details' });
    }
  };  