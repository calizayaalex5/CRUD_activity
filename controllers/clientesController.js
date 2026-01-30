const Clientes = require("../models/clientesModel");

//Obtener clientes
const getAll = async (req, res) => {
    // #swagger.description = 'Obtiene la lista completa de clientes.'
    try {
        const clientes = await Clientes.find();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Obetener cliente por ID
const getClienteById = async (req, res) => {
    // #swagger.description = 'Obtiene un cliente específico por su ID de MongoDB.'
    try {
        const cliente = await Clientes.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Crear cliente
const createCliente = async (req, res) => {
    /* #swagger.parameters['body'] = {
            in: 'body',
            description: 'Datos para registrar un nuevo cliente.',
            schema: {
                nombre: "Juan",
                apellido: "Perez",
                email: "juan.perez@gmail.com",
                telefono: "123456789",
                fechaNacimiento: "1990-01-01",
                ciudad: "Madrid",
                pais: "España"
            }
    } */
    try {
        const nuevoCliente = await Clientes.create(req.body);
        const savedCliente = await nuevoCliente.save();
        res.status(200).json(savedCliente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//editar cliente
const editCliente = async (req, res) => {
    /* #swagger.parameters['body'] = {
            in: 'body',
            description: 'Datos del cliente a actualizar.',
            schema: {
                nombre: "Juan",
                apellido: "Perez Actualizado",
                email: "juan.perez@gmail.com",
                telefono: "987654321",
                fechaNacimiento: "1990-01-01",
                ciudad: "Barcelona",
                pais: "España"
            }
    } */
    try {
        const actualizar = await Clientes.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!actualizar) return res.status(404).json({ message: "Cliente no Encontrado" });
        res.status(200).json(actualizar);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar cliente" + error.message });
    }
};

//eliminar cliente
const deleteCliente = async (req, res) => {
    // #swagger.description = 'Elimina un cliente permanentemente de la base de datos.'
    try {
        const borrar = await Clientes.findByIdAndDelete(req.params.id);
        if (!borrar) return res.status(404).json({ message: "Cliente no encontrado" + error.message });
        res.status(200).json({ message: "Cliente eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al borrar cliente" + error.message });
    }
}

//exportar modulos 
module.exports = {
    getAll,
    getClienteById,
    createCliente,
    editCliente,
    deleteCliente
}
