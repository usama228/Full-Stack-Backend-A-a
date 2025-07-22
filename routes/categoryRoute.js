
const express = require('express');
const {
    addCategory, updateCategory, getAllCategory,
    getAllChildCategory, getCategoryById, deleteCategoryById

} = require('../controllers/categoryController');
const router = express.Router();
router.get('/category', getAllCategory);
router.post('/category', addCategory);
router.patch('/category', updateCategory);
router.get('/sub-category/:parent_id', getAllChildCategory);
router.get('/category/:id', getCategoryById);
router.delete('/category/:id', deleteCategoryById);
module.exports = router;



/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Add a new category
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *               description:
 *                 type: string
 *                 description: Description of the category
 *               parent_id:
 *                 type: integer
 *                 description: The ID of the parent category (optional)
 *             required:
 *               - name
 *               - description
 *     responses:
 *       200:
 *         description: Category added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     category:
 *                       type: object
 *                       description: The created category object
 *                 succeeded:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/category:
 *   patch:
 *     summary: Update an existing category
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID of the category to update
 *               name:
 *                 type: string
 *                 description: Name of the category
 *               description:
 *                 type: string
 *                 description: Description of the category
 *               parent_id:
 *                 type: integer
 *                 description: The ID of the parent category (optional)
 *             required:
 *               - id
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     category:
 *                       type: object
 *                       description: The updated category object
 *                 succeeded:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid category ID or data
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Get all categories with optional child categories
 *     description: Fetches a paginated list of top-level categories.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination (default is 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of categories to fetch per page (default is 10).
 *     responses:
 *       200:
 *         description: Successfully fetched categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     category:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                           parent_id:
 *                             type: integer
 *                             nullable: true
 *                           children:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                 name:
 *                                   type: string
 *                                 parent_id:
 *                                   type: integer
 *                                   nullable: true
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     totalCount:
 *                       type: integer
 *                 succeeded:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /api/sub-category/{parent_id}:
 *   get:
 *     summary: Get all child categories of a specific parent category
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: parent_id
 *         required: true
 *         description: The ID of the parent category
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of child categories for the specified parent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     category:
 *                       type: array
 *                       items:
 *                         type: object
 *                         description: Category object
 *                 totalPages:
 *                   type: integer
 *                   description: Total pages for pagination
 *                 currentPage:
 *                   type: integer
 *                   description: Current page
 *                 totalCount:
 *                   type: integer
 *                   description: Total count of categories
 *       404:
 *         description: Parent category not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Get a category by its ID (either parent or child)
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     category:
 *                       type: object
 *                       description: Category object
 *                 succeeded:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Delete a category by its ID
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 succeeded:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Category has child categories and cannot be deleted
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */