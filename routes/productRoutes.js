
const express = require('express');
const {
  addProduct, updateProduct, getAllProducts, getProductById, deleteProductById,

} = require('../controllers/productController');
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the product
 *         shop_id:
 *           type: integer
 *           description: ID of the associated shop
 *         title:
 *           type: string
 *           description: The title of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: List of image URLs
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the product
 *       required:
 *         - shop_id
 *         - title
 *         - price
 */
const router = express.Router();
router.get('/product', getAllProducts);
router.post('/product', addProduct);
router.patch('/product', updateProduct);
router.get('/product/:id', getProductById);
router.delete('/product/:id', deleteProductById);
module.exports = router;

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get a paginated list of products with optional filters
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of products to retrieve per page
 *       - in: query
 *         name: shop_id
 *         schema:
 *           type: integer
 *           default: null
 *         description: Shop id to get all products of that shop
 *       - in: query
 *         name: min_price
 *         schema:
 *           type: string
 *         description: Filter products by Price Range
 *       - in: query
 *         name: max_price
 *         schema:
 *           type: string
 *         description: Filter products by Price Range
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter products by title (case-insensitive, partial match)
 *     responses:
 *       200:
 *         description: A list of products along with pagination details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           title:
 *                             type: string
 *                           description:
 *                             type: string
 *                           images:
 *                             type: array
 *                             items:
 *                               type: string
 *                               format: url
 *                           price:
 *                             type: number
 *                             format: decimal
 *                           shop_id:
 *                             type: integer
 *                           Shop:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                               owner_name:
 *                                 type: string
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                     totalPages:
 *                       type: integer
 *                       description: Total number of pages
 *                     currentPage:
 *                       type: integer
 *                       description: Current page number
 *                     totalCount:
 *                       type: integer
 *                       description: Total number of products
 *                 succeeded:
 *                   type: boolean
 *                   description: Whether the operation succeeded
 *                 message:
 *                   type: string
 *                   description: Operation message
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Add a new product
 *     description: Creates a new product and associates it with a shop and category.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shop_id
 *               - title
 *               - price
 *               - category_id
 *             properties:
 *               shop_id:
 *                 type: integer
 *                 description: The ID of the shop associated with the product.
 *                 example: 2
 *               title:
 *                 type: string
 *                 description: The title of the product.
 *                 example: "New Product Title"
 *               description:
 *                 type: string
 *                 description: A description of the product.
 *                 example: "This is a sample product description."
 *               images:
 *                 type: array
 *                 description: An array of image URLs for the product.
 *                 items:
 *                   type: string
 *                 example: ["image1.jpg", "image2.jpg"]
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the product.
 *                 example: 150.75
 *               category_id:
 *                 type: integer
 *                 description: The ID of the category associated with the product.
 *                 example: 3
 *     responses:
 *       200:
 *         description: Product added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the newly created product.
 *                       example: 1
 *                     shop_id:
 *                       type: integer
 *                       description: The ID of the associated shop.
 *                       example: 2
 *                     title:
 *                       type: string
 *                       description: The title of the product.
 *                       example: "New Product Title"
 *                     description:
 *                       type: string
 *                       description: The description of the product.
 *                       example: "This is a sample product description."
 *                     images:
 *                       type: array
 *                       description: An array of image URLs for the product.
 *                       items:
 *                         type: string
 *                       example: ["image1.jpg", "image2.jpg"]
 *                     price:
 *                       type: number
 *                       format: float
 *                       description: The price of the product.
 *                       example: 150.75
 *                     category_id:
 *                       type: integer
 *                       description: The ID of the associated category.
 *                       example: 3
 *                     Shop:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The ID of the shop.
 *                           example: 2
 *                         owner_name:
 *                           type: string
 *                           description: The name of the shop owner.
 *                           example: "Jane Doe"
 *                         User:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               description: The ID of the user.
 *                               example: 1
 *                             email:
 *                               type: string
 *                               description: The email address of the user.
 *                               example: "jane.doe@example.com"
 *                     Category:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The ID of the category.
 *                           example: 3
 *                         name:
 *                           type: string
 *                           description: The name of the category.
 *                           example: "Electronics"
 *                 succeeded:
 *                   type: boolean
 *                   description: Indicates if the creation was successful.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message indicating the product was added successfully.
 *                   example: "Product added successfully."
 *       400:
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating invalid data.
 *                   example: "Invalid input data."
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating a server error.
 *                   example: "Internal server error."
 */

/**
 * @swagger
 * /api/product:
 *   patch:
 *     summary: Update a product
 *     description: Updates the details of an existing product, including its associated shop and category.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the product to update.
 *                 example: 5
 *               shop_id:
 *                 type: integer
 *                 description: The ID of the shop associated with the product.
 *                 example: 2
 *               title:
 *                 type: string
 *                 description: The updated title of the product.
 *                 example: "Updated Product Title"
 *               description:
 *                 type: string
 *                 description: The updated description of the product.
 *                 example: "Updated Description"
 *               images:
 *                 type: array
 *                 description: An array of image URLs for the product.
 *                 items:
 *                   type: string
 *                 example: ["image1.jpg", "image2.jpg"]
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The updated price of the product.
 *                 example: 199.99
 *               categoryId:
 *                 type: integer
 *                 description: The ID of the category associated with the product.
 *                 example: 3
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the updated product.
 *                       example: 5
 *                     shop_id:
 *                       type: integer
 *                       description: The ID of the associated shop.
 *                       example: 2
 *                     title:
 *                       type: string
 *                       description: The updated title of the product.
 *                       example: "Updated Product Title"
 *                     description:
 *                       type: string
 *                       description: The updated description of the product.
 *                       example: "Updated Description"
 *                     images:
 *                       type: array
 *                       description: The updated array of image URLs for the product.
 *                       items:
 *                         type: string
 *                       example: ["image1.jpg", "image2.jpg"]
 *                     price:
 *                       type: number
 *                       format: float
 *                       description: The updated price of the product.
 *                       example: 199.99
 *                     categoryId:
 *                       type: integer
 *                       description: The ID of the associated category.
 *                       example: 3
 *                     Shop:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The ID of the shop.
 *                           example: 2
 *                         owner_name:
 *                           type: string
 *                           description: The name of the shop owner.
 *                           example: "John Doe"
 *                         User:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               description: The ID of the user.
 *                               example: 1
 *                             email:
 *                               type: string
 *                               description: The email address of the user.
 *                               example: "john.doe@example.com"
 *                     Category:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The ID of the category.
 *                           example: 3
 *                         name:
 *                           type: string
 *                           description: The name of the category.
 *                           example: "Electronics"
 *                 succeeded:
 *                   type: boolean
 *                   description: Indicates if the update was successful.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message describing the outcome of the operation.
 *                   example: "Product updated successfully."
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the product was not found.
 *                   example: "Product not found."
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating a server error occurred.
 *                   example: "An internal error occurred."
 */

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID
 *     responses:
 *       200:
 *         description: A single product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Product not found
 */





