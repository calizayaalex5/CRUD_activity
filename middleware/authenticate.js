const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json("Lo siento, no tienes acceso. Por favor inicia sesion")
}

module.exports = { isAuthenticated };