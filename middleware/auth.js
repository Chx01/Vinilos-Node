 const jwt = require('jsonwebtoken');
 const AppError = require('../errors/AppError');
 
 function verificarAutentificacion(req, res, next) {
     const authHeader = req.headers.authorization;
     if (!authHeader || !authHeader.startsWith('Bearer ')) {
         return next(new AppError('No estas autenticado', 401));
     }
     const token = authHeader.split(' ')[1];
     try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         req.user = decoded; // { usuarioId, email, rolId }
         next();
     } catch (err) {
         return next(new AppError('Token inválido o expirado', 401));
     }
 }
 
 module.exports = verificarAutentificacion;
