
const express = require('express');
const {
    getAllCountries,
    getStatesByCountryId,
    getCitiesByStateId

} = require('../controllers/countryController');
const router = express.Router();
router.get('/countries', getAllCountries);
router.get('/countries/:id/states', getStatesByCountryId);
router.get('/countries/:countryId/states/:stateId/cities', getCitiesByStateId);
module.exports = router;


/**
 * @swagger
 * /api/countries/{countryId}/states/{stateId}/cities:
 *   get:
 *     summary: Get all cities of a state
 *     tags:
 *       - Country
 *     parameters:
 *       - name: countryId
 *         in: path
 *         required: true
 *         description: The ID of the country
 *         schema:
 *           type: integer
 *       - name: stateId
 *         in: path
 *         required: true
 *         description: The ID of the state
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of cities for the state.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       latitude:
 *                         type: string
 *                       longitude:
 *                         type: string
 *                 message:
 *                   type: string
 *                 succeeded:
 *                   type: boolean
 *       404:
 *         description: State not found
 *       500:
 *         description: Error fetching cities
 */
/**
 * @swagger
 * /api/countries/{id}/states:
 *   get:
 *     summary: Get all states of a country
 *     tags:
 *       - Country
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the country
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of states for the country, excluding cities.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       state_code:
 *                         type: string
 *                       latitude:
 *                         type: string
 *                       longitude:
 *                         type: string
 *                 message:
 *                   type: string
 *                 succeeded:
 *                   type: boolean
 *       404:
 *         description: Country not found
 *       500:
 *         description: Error fetching states
 */

 /**
 * @swagger
 * /api/countries:
 *   get:
 *     summary: Get all countries
 *     tags:
 *       - Country
 *     responses:
 *       200:
 *         description: A list of countries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique identifier of the country
 *                   name:
 *                     type: string
 *                     description: The name of the country
 *                   phone_code:
 *                     type: string
 *                     description: The phone code of the country
 *                   numeric_code:
 *                     type: string
 *                     description: The numeric code of the country
 *                   capital:
 *                     type: string
 *                     description: The capital city of the country
 *                   currency:
 *                     type: string
 *                     description: The currency of the country
 *                   region:
 *                     type: string
 *                     description: The region of the country
 *                   states:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The unique identifier of the state
 *                         country_id:
 *                           type: integer
 *                           description: The ID of the country the state belongs to
 *                         name:
 *                           type: string
 *                           description: The name of the state
 *                         latitude:
 *                           type: string
 *                           description: The latitude of the state
 *                         longitude:
 *                           type: string
 *                           description: The longitude of the state
 *                         cities:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 description: The unique identifier of the city
 *                               name:
 *                                 type: string
 *                                 description: The name of the city
 *                               latitude:
 *                                 type: string
 *                                 description: The latitude of the city
 *                               longitude:
 *                                 type: string
 *                                 description: The longitude of the city
 *       500:
 *         description: Server error
 */