module.exports = function (app, swig, gestorBD) {
    app.post("/comentarios/:cancion_id", function (req, res) {
        if (req.session.usuario == null) {
            res.send("No hay usuario activo. Inicie sesión previamente.");
            return;
        }

        let id = req.params.cancion_id;
        let comentario = {
            autor: req.session.usuario,
            texto: req.body.comentario,
            cancion_id: gestorBD.mongo.ObjectID(id)
        }

        gestorBD.agregarComentario(comentario, function (id) {
            if (id == null) {
                req.session.errores = {mensaje: 'Error al insertar comentario', tipoMensaje: "alert-danger"};
                res.redirect("/errors");
            } else {
                res.send('Comentario insertado: ' + id);
            }
        });
    });
};