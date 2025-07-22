const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0', // OpenAPI version
    info: {
      title: 'Soltronic',
      version: '1.0.0',
      description: 'Solar Energies',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Replace with your server URL
      },
    ],
  };
  
  const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Path to API doc files
  };
  
  const swaggerSpec = swaggerJsdoc(options);
  
  module.exports = { swaggerUi, swaggerSpec };