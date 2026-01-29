const router = require("express").Router();

router.use("/clientes", require("./clientes"));
router.use("/videojuegos", require("./videojuegos"));

router.get('/', (req, res) => {
    res.send("API CRUD funcionando - Ve a /api-docs para la documentación");
});

module.exports = router;