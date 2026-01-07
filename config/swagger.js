const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // มาตรฐาน OpenAPI
    info: {
      title: 'BTY Backend API',
      version: '1.0.0',
      description: 'API Documentation for Customer, Order, and Transaction System',
    },
    servers: [
      {
        url: 'http://localhost:5000', // URL ของ Server เรา
        description: 'Local server',
      },
    ],
  },
  // ให้มันไปอ่าน Comment ในไฟล์ Routes ทั้งหมด
  apis: ['./routes/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = specs;