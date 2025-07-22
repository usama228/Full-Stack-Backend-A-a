const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const { Country } = require('../models');




const getAllCountries = asyncHandler(async (req, res) => {
    try {
        const countries = await Country.findAll({
            attributes: ['id', 'name', 'phone_code', 'numeric_code', 'other_details']
        });
        res.status(200).json({
            data: countries,
            succeeded: true,
            message: "List Get SuccessFully"
        });

    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

const getStatesByCountryId = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the country by its ID
        const country = await Country.findOne({
            where: { id },
            attributes: ['id', 'name', 'states'], // Include states but will filter cities later
            raw: true
        });

        // If country doesn't exist
        if (!country) {
            return res.status(404).json({ message: "Country not found" });
        }

        // Retrieve the states from the `states` JSON field
        const states = country.states || [];

        // Remove cities from each state (you only need to return state data, not cities)
        const statesWithoutCities = states.map(state => {
            const { cities, ...stateWithoutCities } = state; // Remove the cities field
            return stateWithoutCities;
        });

        res.status(200).json({
            data: statesWithoutCities,
            message: "States fetched successfully",
            succeeded: true
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching states", error: error.message });
    }
});


const getCitiesByStateId = asyncHandler(async (req, res) => {
    try {
        const { countryId, stateId } = req.params;

        // Fetch the country by its ID
        const country = await Country.findOne({
            where: { id: countryId },
            attributes: ['id', 'name', 'states'],
            raw: true
        });

        // If country doesn't exist
        if (!country) {
            return res.status(404).json({ message: "Country not found" });
        }

        // Retrieve the states and find the matching state
        const state = (country.states || []).find(state => state.id == stateId);

        // If state doesn't exist
        if (!state) {
            return res.status(404).json({ message: "State not found" });
        }

        // Retrieve the cities for the state
        const cities = state.cities || [];

        res.status(200).json({
            data: cities,
            message: "Cities fetched successfully",
            succeeded: true
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching cities", error: error.message });
    }
});

module.exports = {
    getAllCountries,
    getStatesByCountryId,
    getCitiesByStateId
};