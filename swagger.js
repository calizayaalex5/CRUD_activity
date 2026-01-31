const swaggerAutogen = require("swagger-autogen");

const doc = {
    info: {
        title: "API de Videojuegos",
        description: "API de Videojuegos"
    },
    host: "crud-activity.onrender.com",
    schemes: ["https"],
    securityDefinitions: {
        oauth2: {
            type: "oauth2",
            authorizationUrl: "https://github.com/login/oauth/authorize",
            flow: "implicit",
            scopes: {
                read: "read",
                write: "write"
            }
        }
    }
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
