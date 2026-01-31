const router = require("express").Router();
const videojuegosController = require("../controllers/videojuegosController");
const { isAuthenticated } = require("../middleware/authenticate");

//rutas publicas
router.get("/", videojuegosController.getAll);
router.get("/:id", videojuegosController.getVideojuegoById);

//rutas privadas
router.post("/", isAuthenticated, videojuegosController.createGame);
router.put("/:id", isAuthenticated, videojuegosController.editGame);
router.delete("/:id", isAuthenticated, videojuegosController.deleteGame);

module.exports = router;
