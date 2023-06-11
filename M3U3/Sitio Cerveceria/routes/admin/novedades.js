var express = require ('express');
var router = express.Router();
var novedadesModel = require ('../../models/novedadesModel');



/*GET novedades page*/
router.get('/', async function(req, res, next){

    var novedades = await novedadesModel.getNovedades();

    res.render('admin/novedades', {
        layout: 'admin/layout',
        persona: req.session.nombre, 
        novedades
    });
});

/*para eliminar una novedad*/
router.get ('/eliminar/:id', async (req, res, next) => {
    const id = req.params.id;
    await novedadesModel.deleteNovedadesById (id);
    res.redirect('/admin/novedades');
});


/*para que aparezca el form de agregar*/
router.get('/agregar', (req, res, next) => {
    res.render ('admin/agregar', {
        layout: 'admin/layout'
    }) //cierra render
}); //cierra GET

/*Agregar > post > insert en la tabla*/
router.post('/agregar', async (req, res, next) => {
    try {
        if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != ""){
            console.log(req.body);
            await novedadesModel.insertNovedad(req.body);
            res.redirect('/admin/novedades');
        } else {
            res.render ('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log (error);
        res.render('admin/agregar', {
            layout: 'admin/layout',
                error: true,
                message: 'No se cargó la novedad'
        })
    }
})

/*me muestre el diseño del modificar con los datos de una sola novedad*/
router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
    var novedad = await novedadesModel.getNovedadesById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        novedad
    });
});

/*modificar la novedad*/
router.post('/modificar', async (req, res, next) => {
    try {
        console.log(req.body.id);
        var obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo
        }

        console.log(obj); //para ver si trae los datos
        await novedadesModel.modificarNovedadById(obj, req.body.id);
        res.redirect('/admin/novedades');
    } catch (error) {
        console.log(error);
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modificó la novedad'
        })
    }
});

module.exports = router;