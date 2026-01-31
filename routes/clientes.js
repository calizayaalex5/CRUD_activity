const { isAuthenticated } = require("../middleware/authenticate");
const router = require("express").Router();
const clientesController = require("../controllers/clientesController");

//rutas publicas
router.get("/", clientesController.getAll);
router.get("/:id", clientesController.getClienteById);

//rutas privadas
router.post("/", isAuthenticated, clientesController.createCliente);
router.put("/:id", isAuthenticated, clientesController.editCliente);
router.delete("/:id", isAuthenticated, clientesController.deleteCliente);

module.exports = router;
