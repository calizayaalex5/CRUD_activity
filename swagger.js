const swaggerAutogen = require("swagger-autogen");

const doc = {
    info: {
        title: "API de Videojuegos",
        description: "API de Videojuegos"
    },
    host: "crud-activity.onrender.com",
    schemes: ["http", "https"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/clientes.js", "./routes/videojuegos.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
