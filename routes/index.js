const router = require("express").Router();

router.get('/', (req, res) => {
    res.send("API CRUD funcionando - Ve a /api-docs para la documentación");
});

router.use("/clientes", require("./clientes"));
router.use("/videojuegos", require("./videojuegos"));

module.exports = router;