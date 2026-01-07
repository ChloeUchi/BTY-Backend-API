const swaggerJsdoc = require('swagger-jsdoc');

const servers = [
  {
    url: 'http://localhost:5000',
    description: 'Local Server (Development)',
  },
  {
    url: 'https://bty-backend-api.onrender.com',
    description: 'Production Server (Render)',
  }
];

if (process.env.NODE_ENV === 'production') {
  servers.reverse();
}

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BTY Backend API',
      version: '1.0.0',
      description: 'API Documentation for BTY Shop',
    },
    servers: servers,
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(swaggerOptions);

module.exports = specs;