const express = require("express");
const router = express.Router();
const config = require("../lib/config");
const sql = require("mssql");
const InicioModule = require("../class/Inicio");


router.post("/inicio", async (req, res) => { //agregar
  try {
    let data = { ...req.body, ...req.params };
    let inicio = new InicioModule(data);
    let pool = await sql.connect(config);
    let result = await pool.request()
    .input('titulo_inicio',sql.VarChar(250),inicio.titulo_inicio)
    .input('subtitulo_inicio',sql.VarChar(250),inicio.subtitulo_inicio)
    .input('imagen',sql.VarChar(250),inicio.imagen)

    .input('titulo_carousel',sql.VarChar(250),inicio.titulo_carousel)
    .input('seccion_carousel',sql.VarChar(100),inicio.seccion_carousel)
    .input('detalles_carousel',sql.VarChar(300),inicio.detalles_carousel)

    .input('descripcion_quienessomos',sql.VarChar(250),inicio.descripcion_quienessomos)

    .input('integrante',sql.VarChar(250),inicio.integrante)
    .input('descripcion_nuestroequipo',sql.VarChar(300),inicio.descripcion_nuestroequipo)
    .input('subtitulo_nuestroequipo',sql.VarChar(250),inicio.subtitulo_nuestroequipo)
    .query(inicio.querySave)

    if (result.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.status(200).json({message:"Usuario creado correctamente"});

  } catch (error) {
    console.error(error)
    res.status(300).json({error:`Hay clavo tio ${error}`})
  }
});

router.get("/inicio", async (req, res) => {// get all
  try {
    let data = { ...req.body, ...req.params };
    let inicio = new InicioModule(data);
    let pool = await sql.connect(config);
    let result = await pool.request().query(inicio.querygetAll)

    if (result.rowsAffected <= 0){ throw "No existe datos con esos parámetros"}
        res.status(200).json(result.recordset);

  } catch (error) {
    console.error(error)
    res.status(300).json({error:`Hay clavo tio ${error}`})
  }
});

router.put('/inicio/:id', async(req, res)=>{ //modificar
  try {
    let data = {...req.body,...req.params};
        let inicio = new InicioModule(data);
        let pool =  await sql.connect(config);

        let response = await pool.request()
        .input('id', sql.Int,inicio.id)
        .input('titulo_inicio',sql.VarChar(250),inicio.titulo_inicio)
        .input('subtitulo_inicio',sql.VarChar(250),inicio.subtitulo_inicio)
        .input('imagen',sql.VarChar(250),inicio.imagen)
        .input('titulo_carousel',sql.VarChar(250),inicio.titulo_carousel)
        .input('seccion_carousel',sql.VarChar(100),inicio.seccion_carousel)
        .input('detalles_carousel',sql.VarChar(300),inicio.detalles_carousel)
        .input('descripcion_quienessomos',sql.VarChar(250),inicio.descripcion_quienessomos)
        .input('integrante',sql.VarChar(250),inicio.integrante)
        .input('descripcion_nuestroequipo',sql.VarChar(300),inicio.descripcion_nuestroequipo)
        .input('subtitulo_nuestroequipo',sql.VarChar(250),inicio.subtitulo_nuestroequipo)
        .query(inicio.queryUpdate)
        res.status(200).json({data:data,message:"Modificado exitosamente"})

  } catch (error) {
    console.error(`Hay clavo tio ${error}`)
    res.status(300).json({error:`Hay clavo tio ${error}`})
  }
});

router.delete('/inicio/:id', async(req, res)=>{ //eliminar
  try {
    let data = {...req.body,...req.params};
        let inicio = new InicioModule(data);
        let pool =  await sql.connect(config);
        let response = await pool.request()
        .input('id', sql.Int,inicio.id)
        .query(inicio.queryDelete)
        res.status(200).json({ message: "Datos han sido Eliminados" });

  } catch (error) {
    console.error(`Hay clavo tio ${error}`)
    res.status(300).json({error:`Hay clavo tio ${error}`})
  }
});

router.get('/inicio/:id', async(req, res)=>{ //get by id
  try {
    let data = {...req.body,...req.params};
        let inicio = new InicioModule(data);
        let pool =  await sql.connect(config);
        let response = await pool.request()
        .input('id', sql.Int,inicio.id)
        .query(inicio.querygetById)
        if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"}
        res.status(200).json(response.recordset);

  } catch (error) {
    console.error(`Hay clavo tio ${error}`)
    res.status(300).json({error:`Hay clavo tio ${error}`})
  }
});

module.exports = router;
