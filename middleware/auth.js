function verificarAutentificacion(req, res, next) {
    if (usuarioAutenticado) {
        next();
    } else {
        res.status(401).send('No estas autenticado');
    }
}
