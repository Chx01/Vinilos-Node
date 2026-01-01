const { Op } = require("sequelize");
const Usuarios = require("../models/usuarios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError")

//Loguearse
const authenticationController = {
    
    async login(email, password) {
        const usuario = await Usuarios.findOne({ where: { email } });
        if (!usuario) {
            throw new AppError('El usuario no existe en la base de datos', 401);
        }
        const passwordMatch = await bcrypt.compare(password, usuario.password);
        if (!passwordMatch) {
            throw new AppError('Contraseña Incorrecta', 401);
        }
        const payload = { usuarioId: usuario.id, email: usuario.email, rolId: usuario.rolId };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "30m" }
        );
        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );
        return { token, refreshToken, user: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rolId: usuario.rolId } };
    },

    refreshAuthToken(refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const payload = { usuarioId: decoded.usuarioId, email: decoded.email, rolId: decoded.rolId };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30m" });
            return token;
        } catch (error) {
            throw new AppError('Token de refresco inválido', 401);
        }
    },
}

module.exports = authenticationController;