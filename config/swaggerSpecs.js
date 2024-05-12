const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0", // OpenAPI Specification version
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Verification microservice documentation",
    },
    servers: [
      {
        url: "http://localhost:3600/", // URL of your server
      },
    ],
  },

  apis: ["./routes/*.js"], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
