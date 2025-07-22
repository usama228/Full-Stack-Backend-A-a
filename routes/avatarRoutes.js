const express = require("express");
const router = express.Router();
const { addImage, uploadAvatar } = require("../controllers/avatarController");
router.post('/avatar', uploadAvatar, addImage);

module.exports = router;


/**
 * @swagger
 * /api/images/avatar:
 *   post:
 *     summary: Upload an avatar image
 *     tags:
 *       - Avatar
 *     description: Upload an avatar image to the server.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: The avatar image file to upload
 *     responses:
 *       200:
 *         description: Avatar uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     avatar:
 *                       type: object
 *                       properties:
 *                         filename:
 *                           type: string
 *                           description: The uploaded file's filename
 *                         originalname:
 *                           type: string
 *                           description: The original filename of the uploaded file
 *                         mimetype:
 *                           type: string
 *                           description: The mime type of the file
 *                         size:
 *                           type: integer
 *                           description: The size of the uploaded file in bytes
 *                         path:
 *                           type: string
 *                           description: The path where the file is stored
 *                 succeeded:
 *                   type: boolean
 *                   description: Whether the operation was successful
 *                 message:
 *                   type: string
 *                   description: A message providing more details
 *       400:
 *         description: Invalid file format or file not provided
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/images/avatar:
 *   post:
 *     summary: Save image information in the database
 *     tags:
 *       - Avatar
 *     description: After uploading an avatar image, save its details to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filename:
 *                 type: string
 *                 description: The name of the uploaded file
 *               originalname:
 *                 type: string
 *                 description: The original name of the uploaded file
 *               mimetype:
 *                 type: string
 *                 description: The MIME type of the uploaded file
 *               size:
 *                 type: integer
 *                 description: The size of the uploaded file in bytes
 *               path:
 *                 type: string
 *                 description: The server path where the file is stored
 *     responses:
 *       200:
 *         description: Image information saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     avatar:
 *                       type: object
 *                       properties:
 *                         filename:
 *                           type: string
 *                         originalname:
 *                           type: string
 *                         mimetype:
 *                           type: string
 *                         size:
 *                           type: integer
 *                         path:
 *                           type: string
 *                 succeeded:
 *                   type: boolean
 *                   description: Whether the operation was successful
 *                 message:
 *                   type: string
 *                   description: A message with additional details
 *       400:
 *         description: Missing or invalid data
 *       500:
 *         description: Internal server error
 */