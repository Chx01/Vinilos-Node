const { Op } = require("sequelize");
const Usuarios = require("../models/usuarios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError")

//Loguearse
const authenticationController = {
    
    async login(nombre, email, password) {
        const usuarios = await Usuarios.findOne({ where: { email }});
        if(!usuarios) {
            throw new AppError('El usuario no existe en la base de datos', 401)
        }
        //Verificar si la contraseña coincide
        const passwordMatch = await bcrypt.compare(password, usuarios.password);
        if(!passwordMatch) {
            throw new AppError ('Contraseña Incorrecta', 401);
        }
        const token = jwt.sign(
            {usuarioId: usuarios.id, email: usuarios.email, rol: usuarios.rol },
            process.env.JWT_SECRET,
            {
                expiresIn: "30min",
            }
        );
        const refreshToken = jwt.sign(
            { usuarioId: usuarios.id, email: usuarios.email, rol: usuarios.rol},
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d"}
        );
        return {token, refreshToken};
    },

}

module.exports = authenticationController;