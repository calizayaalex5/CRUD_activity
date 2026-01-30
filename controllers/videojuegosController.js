const Videojuegos = require("../models/videojuegos");

// Obtener videojuegos
const getAll = async (req, res) => {
    // #swagger.description = 'Retorna todos los videojuegos de la base de datos.'
    try {
        const videojuegos = await Videojuegos.find();
        res.status(200).json(videojuegos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener videojuego por ID
const getVideojuegoById = async (req, res) => {
    // #swagger.description = 'Retorna el videojuego segun el ID en la base de datos.'
    try {
        const videojuegos = await Videojuegos.findById(req.params.id);
        if (!videojuegos) {
            return res.status(404).json({ message: "Juego no encontrado" });
        }
        res.status(200).json(videojuegos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo item
const createGame = async (req, res) => {
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Información para el nuevo videojuego.',
        schema: {
            title: "The Last of Us",
            author: "Naughty Dog",
            published_date: "2022-06-14",
            price: 19.99,
            publisher: "Sony",
            category: "Zombie",
            stock: 100,
            description: "Un juego de supervivencia post-apocalíptico."
        }
    } */
    try {
        // .create() es suficiente, no necesitas .save() después
        const nuevoJuego = await Videojuegos.create(req.body);
        res.status(201).json(nuevoJuego);
    } catch (error) {
        res.status(500).json({ message: "Error de validacion: " + error.message });
    }
};

// Editar juego
const editGame = async (req, res) => {
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Campos a actualizar en el videojuego.',
        schema: {
            title: "The Last of Us Part I",
            price: 49.99,
            stock: 80
        }
    } */
    try {
        const id = req.params.id;
        const updatedGame = await Videojuegos.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedGame) {
            return res.status(404).json({ message: "Juego no encontrado" });
        }
        res.status(200).json(updatedGame); // Cambiado a 200 para que veas el resultado en el video
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar juego
const deleteGame = async (req, res) => {
    // #swagger.description = 'Elimina un juego de la base de datos usando su ID.'
    try {
        const videojuegos = await Videojuegos.findByIdAndDelete(req.params.id);
        if (!videojuegos) {
            return res.status(404).json({ message: "Juego no encontrado" });
        }
        res.status(200).json({ message: "Juego eliminado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAll,
    getVideojuegoById,
    createGame,
    editGame,
    deleteGame
};