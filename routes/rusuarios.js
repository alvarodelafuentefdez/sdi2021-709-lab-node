module.exports = function (app, swig, gestorBD) {
    app.get("/usuarios", function (req, res) {
        res.send("ver usuarios");
    });

    app.get("/registrarse", function (req, res) {
        let respuesta = swig.renderFile('views/bregistro.html', {});
        res.send(respuesta);
    });

    app.get("/identificarse", function (req, res) {
        let respuesta = swig.renderFile('views/bidentificacion.html', {});
        res.send(respuesta);
    });

    app.post("/identificarse", function (req, res) {
        let seguro = app.get("crypto").createHmac('sha256', app.get('clave'))
            .update(req.body.password).digest('hex');
        let criterio = {
            email: req.body.email,
            password: seguro
        }

        gestorBD.obtenerUsuarios(criterio, function (usuarios) {
            if (usuarios == null || usuarios.length == 0) {
                req.session.usuario = null;
                req.session.errores = {mensaje: 'Error al identificarse. Usuario o contraseña incorrectos.', tipoMensaje: "alert-danger"};
                res.redirect("/errors");
                //res.redirect("/identificarse" + "?mensaje=Email o password incorrecto" + "&tipoMensaje=alert-danger ");
            } else {
                req.session.usuario = usuarios[0].email;
                res.redirect("/publicaciones");
            }
        });
    });

    app.get('/desconectarse', function (req, res) {
        req.session.usuario = null;
        res.send("Usuario desconectado");
    });

    app.post('/usuario', function (req, res) {
        let seguro = app.get("crypto").createHmac('sha256', app.get('clave'))
            .update(req.body.password).digest('hex');
        let usuario = {
            email: req.body.email,
            password: seguro
        }

        gestorBD.insertarUsuario(usuario, function (id) {
            if (id == null) {
                req.session.errores = {mensaje: 'Error al registrar usuario', tipoMensaje: "alert-danger"};
                res.redirect("/errors");
            } else {
                req.session.errores = {mensaje: 'Nuevo usuario registrado', tipoMensaje: "alert-info"};
                res.redirect("/errors");
            }
        });
    });


};