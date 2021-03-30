module.exports = function (app, swig) {
    app.get("/autores/agregar", function (req, res) {
        let respuesta = swig.renderFile('views/autores-agregar.html', {});
        res.send(respuesta);
    });

    app.post("/autor", function (req, res) {
        let info = "Autor agregado: ";

        if (typeof req.body.nombre == "undefined")
            info += "\"nombre\" no enviado en la petición." + "<br>";
        else
            info += req.body.nombre + "<br>";

        if (typeof req.body.grupo == "undefined")
            info += "\"grupo\" no enviado en la petición." + "<br>";
        else
            info += "Grupo: " + req.body.grupo + "<br>";

        if (typeof req.body.rol == "undefined")
            info += "\"rol\" no enviado en la petición." + "<br>";
        else
            info += "Rol:" + req.body.rol + "<br>";

        res.send(info);
    });

    app.get("/autores", function (req, res) {
        let autores = [{
            "nombre": "John",
            "grupo": "Black Eye",
            "rol": "Bajista"
        }, {
            "nombre": "Miley",
            "grupo": "Sin grupo",
            "rol": "Cantante"
        }, {
            "nombre": "Levia",
            "grupo": "The Roses",
            "rol": "Guitarrista"
        }];

        let respuesta = swig.renderFile('views/autores.html', {
            vendedor: 'Autores',
            autores: autores
        });

        res.send(respuesta);
    });

    app.get("/autores*", function (req, res) {
        res.redirect("/autores/");
    });
};