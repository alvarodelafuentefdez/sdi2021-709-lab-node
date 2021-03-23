module.exports = function (app) {
    app.get("/canciones", function (req, res) {
        let respuesta = "";

        if (req.query.nombre != null)
            respuesta += 'Nombre: ' + res.query.nombre + '<br>';

        if (typeof (res.query.nombre) != 'undefined')
            respuesta += 'Autor: ' + res.query.autor;

        res.send(respuesta);
    });

    app.get('/suma', function (req, res) {
        let respuesta = parseInt(req.query.num1) + parseInt(req.query.num2);
        res.send(String(respuesta));
    });

    app.get('/canciones/:id', function (req, res) {
        let respuesta = 'id: ' + req.params.id;
        res.send(respuesta);
    });

    app.get('/canciones/:genero/:id', function (req, res) {
        let respuesta = 'id: ' + req.params.id + '<br>'
            + 'Género: ' + req.params.genero;
        res.send(respuesta);
    });

    app.post("/cancion", function (req, res) {
        res.send("Canción agregada: " + req.body.nombre + "<br>" + " género: " + res.body.genero + "<br>" + " precio: " + req.body.precio);
    });
};