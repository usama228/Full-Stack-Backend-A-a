const express = require('express');
const router = express.Router();
const {
    addProject, updateProject,
    getAllProjects, getProjectById,
    deleteProjectById,

} = require('../controllers/projectController');

router.post('/project', addProject);
router.get('/project', getAllProjects);
router.get('/project/:id', getProjectById);
router.patch('/project', updateProject);
router.delete('/project/:id', deleteProjectById);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the project
 *         installer_id:
 *           type: integer
 *           description: The ID of the installer associated with the project
 *         name:
 *           type: string
 *           description: Name of the project
 *         description:
 *           type: string
 *           description: Description of the project
 *         address:
 *           type: string
 *           description: Address of the project
 *         contact_person:
 *           type: object
 *           description: Contact person's name and phone number for the project
 *         start_date:
 *           type: string
 *           format: date-time
 *           description: Start date of the project
 *         end_date:
 *           type: string
 *           format: date-time
 *           description: End date of the project (optional)
 *       required:
 *         - installer_id
 *         - name
 *         - address
 *         - contact_person_name
 *         - contact_person_number
 *         - start_date
 */

/**
 * @swagger
 * /api/project:
 *   post:
 *     summary: Add a new project
 *     description: Create a new project and associate it with an installer. The `contact_person` field should be a JSON object containing the name and phone number of the contact person.
 *     tags:
 *       - Projects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - installer_id
 *               - name
 *               - address
 *               - contact_person
 *               - start_date
 *             properties:
 *               installer_id:
 *                 type: integer
 *                 description: The ID of the installer.
 *                 example: 1
 *               name:
 *                 type: string
 *                 description: The name of the project.
 *                 example: "Solar Panel Installation"
 *               description:
 *                 type: string
 *                 description: A brief description of the project.
 *                 example: "Installing solar panels on a residential building."
 *               address:
 *                 type: string
 *                 description: The address where the project will take place.
 *                 example: "123 Green Street, Springfield"
 *               contact_person:
 *                 type: object
 *                 description: Details of the contact person.
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Full name of the contact person.
 *                     example: "John Doe"
 *                   phone:
 *                     type: string
 *                     description: Contact person's phone number.
 *                     example: "+1234567890"
 *               start_date:
 *                 type: string
 *                 format: date
 *                 description: The start date of the project.
 *                 example: "2025-01-10"
 *               end_date:
 *                 type: string
 *                 format: date
 *                 description: The end date of the project (optional).
 *                 example: "2025-03-15"
 *     responses:
 *       200:
 *         description: Project created successfully.
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
 *                       description: The project ID.
 *                       example: 1
 *                     name:
 *                       type: string
 *                       description: The project name.
 *                       example: "Solar Panel Installation"
 *                     description:
 *                       type: string
 *                       description: Project description.
 *                       example: "Installing solar panels on a residential building."
 *                     address:
 *                       type: string
 *                       description: Project address.
 *                       example: "123 Green Street, Springfield"
 *                     contact_person:
 *                       type: object
 *                       description: Details of the contact person.
 *                       properties:
 *                         name:
 *                           type: string
 *                           description: Full name of the contact person.
 *                           example: "John Doe"
 *                         phone:
 *                           type: string
 *                           description: Contact person's phone number.
 *                           example: "+1234567890"
 *                     start_date:
 *                       type: string
 *                       format: date
 *                       description: Start date of the project.
 *                       example: "2025-01-10"
 *                     end_date:
 *                       type: string
 *                       format: date
 *                       description: End date of the project.
 *                       example: "2025-03-15"
 *                     Installer:
 *                       type: object
 *                       description: Details of the associated installer.
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: Installer ID.
 *                           example: 1
 *                         experience:
 *                           type: string
 *                           description: Installer's experience details.
 *                           example: "5 years in solar panel installations"
 *                         User:
 *                           type: object
 *                           description: Details of the user associated with the installer.
 *                           properties:
 *                             id:
 *                               type: integer
 *                               description: User ID.
 *                               example: 10
 *                             email:
 *                               type: string
 *                               description: User email address.
 *                               example: "installer@example.com"
 *                 succeeded:
 *                   type: boolean
 *                   description: Indicates whether the operation was successful.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Response message.
 *                   example: "Project added successfully"
 *       400:
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "All required fields must be provided"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /api/project:
 *   get:
 *     summary: Get a list of projects
 *     description: Retrieve a paginated list of projects, optionally filtered by name or installer ID. Includes installer details and associated user data.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items to retrieve per page.
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter projects by name (case-insensitive, partial match).
 *       - in: query
 *         name: installer_id
 *         schema:
 *           type: integer
 *         description: Filter projects by the ID of the installer.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of projects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     projects:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: The project ID.
 *                           name:
 *                             type: string
 *                             description: The project name.
 *                           installer:
 *                             type: object
 *                             description: Details about the associated installer.
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 description: The installer ID.
 *                               experience:
 *                                 type: integer
 *                                 description: The installer's years of experience.
 *                               user:
 *                                 type: object
 *                                 description: User information associated with the installer.
 *                                 properties:
 *                                   id:
 *                                     type: integer
 *                                   email:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                                   phone_no:
 *                                     type: string
 *                   totalPages:
 *                     type: integer
 *                     description: Total number of pages.
 *                   currentPage:
 *                     type: integer
 *                     description: The current page number.
 *                   totalCount:
 *                     type: integer
 *                     description: Total number of projects.
 *                 succeeded:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *                 message:
 *                   type: string
 *                   description: A descriptive message about the response.
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                 error:
 *                   type: string
 *                   description: Details about the error.
 */
/**
 * @swagger
 * /api/project/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the project to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/project:
 *   patch:
 *     summary: Update a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the project to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               installer_id:
 *                 type: integer
 *                 description: Installer ID assigned to the project
 *               name:
 *                 type: string
 *                 description: Name of the project
 *               description:
 *                 type: string
 *                 description: Project description
 *               address:
 *                 type: string
 *                 description: Project address
 *               contact_person:
 *                 type: object
 *                 description: Details of the contact person.
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Full name of the contact person.
 *                     example: "John Doe"
 *                   phone:
 *                     type: string
 *                     description: Contact person's phone number.
 *                     example: "+1234567890"
 *               start_date:
 *                 type: string
 *                 format: date-time
 *                 description: Project start date
 *               end_date:
 *                 type: string
 *                 format: date-time
 *                 description: Project end date (optional)
 *             required:
 *               - installer_id
 *               - name
 *               - address
 *               - contact_person_name
 *               - contact_person_number
 *               - start_date
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Project updated successfully"
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Project'
 *       400:
 *         description: Bad Request, Missing Required Fields
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/project/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the project to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal Server Error
 */

