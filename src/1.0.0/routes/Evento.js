const express = require("express");
const router = express.Router();
const config = require("../lib/config");
const sql = require("mssql");
const EventosModule = require("../class/Evento");



router.get("/calendario/eventos", async (req, res) => { //get all
  try {
    let data = { ...req.body, ...req.params };
    let eventos = new EventosModule(data);
    let pool = await sql.connect(config);
    let response = await pool.request().query(eventos.queryGetCalendarEvents);
    if (response.rowsAffected <= 0) {
      throw "No existe datos con esos parámetros";
    }
    res.status(200).json(...response.recordsets);
  } catch (error) {
    console.error(`Hay clavo tio ${error}`);
    res.status(300).json({ error: `Hay clavo tio ${error}` });
  }
});


router.get("/eventos", async (req, res) => { //get all
  try {
    let data = { ...req.body, ...req.params };
    let eventos = new EventosModule(data);
    let pool = await sql.connect(config);
    let response = await pool.request().query(eventos.queryGet);
    if (response.rowsAffected <= 0) {
      throw "No existe datos con esos parámetros";
    }
    res.status(200).json(...response.recordsets);
  } catch (error) {
    console.error(`Hay clavo tio ${error}`);
    res.status(300).json({ error: `Hay clavo tio ${error}` });
  }
});

router.get("/eventos/:id", async (req, res) => {// get by id
  try {
    let data = { ...req.body, ...req.params };
    let eventos = new EventosModule(data);
    let pool = await sql.connect(config) 
    let response = await pool.request()
      .input("id", sql.Int, eventos.id)
      .query(eventos.queryGetById);
    if (response.rowsAffected <= 0) {
      throw "No existe datos con esos parámetros";
    }
    res.status(200).json(response.recordsets);
  } catch (error) {
    console.error(`Hay clavo tio ${e}`);
    res.status(300).json({ error: `Hay clavo tio ${e}` });
  }
});

router.post("/eventos", async (req, res) => {
  try {
    let data = { ...req.body, ...req.params };
    console.log(data)
    let eventos = new EventosModule(data);
    let pool = await sql.connect(config);
    let response = await pool.request()
      .input("fechaInicio", sql.DateTime, eventos.fechaInicio)
      .input("fechaFin", sql.DateTime, eventos.fechaFin)
      .input("titulo", sql.VarChar, eventos.titulo)
      .input("descripcion", sql.VarChar(sql.MAX), eventos.descripcion)
      .input("semana", sql.VarChar, eventos.semana)
      .input("sede", sql.Int, eventos.sede)
      .input("usuarioCreador", sql.Int, eventos.usuarioCreador)
      .input("fechaCreado", sql.VarChar, eventos.fechaCreado)
      .input("imagen", sql.VarChar, eventos.imagen)
      .query(eventos.querySave);
    if (response.rowsAffected <= 0) {
      throw "No existe datos con esos parámetros";
    }
    res.status(200).json({message: "Agregado correctamente",data:data});
  } catch (error) {
    console.error(`Hay clavo tio ${error}`);
    res.status(300).json({ error: `Hay clavo tio ${error}` });
  }
});

router.put("/eventos/:id", async (req, res) => { //modificar
  try {
    let data = { ...req.body, ...req.body };
    let eventos = new EventosModule(data);
    let pool = await sql.connect(config) 
    let response = await pool.request()
      .input('id',sql.Int,eventos.id)
      .input("fechaInicio", sql.DateTime, eventos.fechaInicio)
      .input("fechaFin", sql.DateTime, eventos.fechaFin)
      .input("titulo", sql.VarChar, eventos.titulo)
      .input("descripcion", sql.VarChar(sql.MAX), eventos.descripcion)
      .input("semana", sql.VarChar, eventos.semana)
      .input("sede", sql.Int, eventos.sede)
      .input("imagen", sql.VarChar, eventos.imagen)
      .query(eventos.queryUpdate);
      if (response.rowsAffected <= 0) {
        throw "No existe datos con esos parámetros";
      }
    res.status(200).json({message: "ok",data:data});
  } catch (error) {
    console.error(`Hay clavo tio ${error}`);
    res.status(300).json({ error: `Hay clavo tio ${error}` });
  }
});

router.delete('/eventos/:id',async(req,res)=>{ //eliminar
  try {
      let data = {...req.body,...req.params};
      let eventos = new EventosModule(data);
      let pool =  await sql.connect(config);
      let response = await pool.request()
          .input('id',sql.Int,eventos.id)
          .query(eventos.queryDelete);
      res.status(200).json({message:"Datos han sido Eliminados"})
  } catch (error) {
      console.error(`Hay clavo tio ${error}`)
      res.status(300).json({error:`Hay clavo tio ${error}`})
  }
})


module.exports = router;
