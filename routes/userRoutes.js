const express = require('express');
const {
  createUser,
  getAllUsers,
  loginUser,
  logoutUser,
  updateUser,
  deleteUserById,
  getUserById,

} = require('../controllers/userController');
const { extractUserId, isAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/user',  getAllUsers);
router.post('/user', createUser);
router.patch('/user', updateUser);
router.get('/user/:id', getUserById);
router.delete('/user/:id', deleteUserById);

module.exports = router;


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the user
 *         name:
 *           type: string
 *           description: Name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *         password:
 *           type: string
 *           format: password
 *           description: Password for the user account
 *         avatar:
 *           type: string
 *           format: url
 *           description: Avatar image URL
 *         type:
 *           type: string
 *           enum:
 *             - superAdmin
 *             - shop
 *             - installer
 *           description: User type
 *         phone_no:
 *           type: string
 *           description: User's phone number
 *         address:
 *           type: object
 *           properties:
 *             street:
 *               type: string
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             country:
 *               type: string
 *             zip:
 *               type: string
 *             latitude:
 *               type: number
 *               format: float
 *             longitude:
 *               type: number
 *               format: float
 *         status:
 *           type: string
 *           enum:
 *             - active
 *             - inactive
 *           description: User status
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: User creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 * 
 *     Shop:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         owner_name:
 *           type: string
 *     Installer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         experience:
 *           type: string
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *           example:
 *             email: "soltronic@soltronic.com"
 *             password: "soltronic"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: User logout
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /api/users/user:
 *   get:
 *     summary: Get a paginated list of users with optional filters
 *     tags:
 *       - Users
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
 *         description: Number of users to retrieve per page
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter users by name (case-insensitive, partial match)
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum:
 *             - superAdmin
 *             - shop
 *             - installer
 *         description: Filter users by type
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - active
 *             - inactive
 *         description: Filter users by status
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Filter users by country in the address
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: Filter users by state in the address
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter users by city in the address
 *       - in: query
 *         name: area
 *         schema:
 *           type: string
 *         description: Filter users by area in the address
 *       - in: query
 *         name: radiusInKm
 *         schema:
 *           type: string
 *         description: Filter users by radiusInKm in the address
 *       - in: query
 *         name: userLatitude
 *         schema:
 *           type: string
 *         description: Filter users by radiusInKm in the address
 *       - in: query
 *         name: userLongitude
 *         schema:
 *           type: string
 *         description: Filter users by radiusInKm in the address
 *     responses:
 *       200:
 *         description: A list of users along with pagination details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
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
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the user
 *         name:
 *           type: string
 *           description: Name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *         password:
 *           type: string
 *           format: password
 *           description: Password for the user account
 *         avatar:
 *           type: string
 *           format: url
 *           description: Avatar image URL
 *         type:
 *           type: string
 *           enum:
 *             - superAdmin
 *             - shop
 *             - installer
 *           description: User type (can be 'superAdmin', 'shop', or 'installer')
 *         phone_no:
 *           type: string
 *           description: User's phone number
 *         address:
 *           type: object
 *           properties:
 *             street:
 *               type: string
 *               description: Street address
 *             city:
 *               type: string
 *               description: City of the user
 *             state:
 *               type: string
 *               description: State of the user
 *             country:
 *               type: string
 *               description: Country of the user
 *             zip:
 *               type: string
 *               description: Zip code of the user
 *             latitude:
 *               type: number
 *               format: float
 *               description: Latitude of the user's address
 *             longitude:
 *               type: number
 *               format: float
 *               description: Longitude of the user's address
 *         status:
 *           type: string
 *           enum:
 *             - active
 *             - inactive
 *           description: User status (active or inactive)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: User creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *         owner_name:
 *           type: string
 *           description: Name of the shop owner (required when type is 'shop')
 *         experience:
 *           type: string
 *           description: Experience level of the installer (required when type is 'installer')
 *     Shop:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         owner_name:
 *           type: string
 *           description: The name of the shop owner (required when type is 'shop')
 *     Installer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         experience:
 *           type: string
 *           description: The experience of the installer (required when type is 'installer')
 * /api/users/user:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             name: "John Doe"
 *             email: "john.doe@example.com"
 *             password: "password123"
 *             avatar: "https://example.com/avatar.jpg"
 *             type: "shop"
 *             phone_no: "1234567890"
 *             address:
 *               street: "123 Main St"
 *               city: "New York"
 *               state: "NY"
 *               country: "USA"
 *               zip: "10001"
 *               latitude: 40.7128
 *               longitude: -74.0060
 *             status: "active"
 *             owner_name: "John's Shop"  # Only added if type is 'shop'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     installer:
 *                       $ref: '#/components/schemas/Installer'
 *                     shop:
 *                       $ref: '#/components/schemas/Shop'
 *                 succeeded:
 *                   type: boolean
 *                   description: Whether the creation was successful
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request (e.g., missing required fields based on user type)
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/users/user:
 *   patch:
 *     summary: Update user details
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             name: "Jane Doe"
 *             email: "jane.doe@example.com"
 *             avatar: "https://example.com/avatar.jpg"
 *             phone_no: "9876543210"
 *             address: { street: "456 Elm St", city: "Los Angeles", zip: "90001" }
 *             status: "active"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */
/**
 * @swagger
 * /api/users/user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
/**
 * @swagger
 * /api/users/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */


