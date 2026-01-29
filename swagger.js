const swaggerAutogen = require("swagger-autogen");

const doc = {
    info: {
        title: "API de Videojuegos",
        description: "API de Videojuegos"
    },
    host: "crud-activity.onrender.com",
    schemes: ["https"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
