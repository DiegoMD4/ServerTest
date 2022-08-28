const express= require('express');
const router= express.Router();
const config= require('../lib/config');
const sql = require('mssql');
const CasosModule = require('../class/Casos');
const IntegrantesModule = require('../class/Integrantes');

router.get('/casos',async(req, res)=>{ // get all
    try {
        let data = {...req.body,...req.params};
        let casos = new CasosModule(data);
        let integrantes = new IntegrantesModule(data);
        let pool = await sql.connect(config);
        let response = await pool.request().query(casos.queryGetFirst10);
        let result = await pool.request().query(integrantes.queryGetFirst10);

        if(response.rowsAffected <= 0 && result.rowsAffected <= 0)
        { throw "No existe datos con esos parámetros"};
        res.status(200).json(response.recordsets);

    } catch (error) {
        console.error(`Hay clavo tio ${error}`)
        res.status(300).json({error:`Hay clavo tio ${error}`})
    }
})

router.get('/casos/:id',async(req, res)=>{ //get by id
    try {
        let data = {...req.body,...req.params};
        let casos = new CasosModule(data);
        //let integrantes = new IntegrantesModule(data);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('id', sql.Int, casos.queryGetById)
        .query(casos.queryGetById);

        if(response.rowsAffected <= 0)
        { throw "No existe datos con esos parámetros"};
        res.status(200).json(response.recordsets);

    } catch (error) {
        console.error(`Hay clavo tio ${error}`)
        res.status(300).json({error:`Hay clavo tio ${error}`})
    }
})

router.post('/casos',async(req, res)=>{ //agregar
    try {
        let data = {...req.body,...req.params};
        let casos = new CasosModule(data);
        let integrantes = new IntegrantesModule(data);
        let pool =  await sql.connect(config);
        let response = await pool.request()
            .input('titulo',sql.NVarChar(100),casos.titulo)
            .input('cuerpo',sql.NText,casos.cuerpo)
            .input('tipo',sql.TinyInt,casos.tipo)
            .input('imagenEncabezado',sql.VarChar, casos.imagenEncabezado)
            .input('usuarioCreador',sql.Int,casos.usuarioCreador)
            .input('proyecto',sql.VarChar(100),casos.proyecto)
            .query(casos.queryInsert);

        let result = await pool.request()
            .input('proyecto',sql.VarChar(100),integrantes.proyecto)
            .input('nombre',sql.VarChar(100),integrantes.nombre)
            .input('correo',sql.VarChar(100),integrantes.correo)
            .query(integrantes.queryInsert);

        if (response.rowsAffected <= 0 && result.rowsAffected <= 0)
        { throw "No existe datos con esos parámetros"};
        res.status(200).json({message:"Registrado",data:data})
    } catch (error) {
        console.error(`Hay clavo tio ${error}`)
        res.status(300).json({error:`Hay clavo tio ${error}`})
    }
})

router.put('/casos/:id/:id_',async(req, res)=>{ //casos/:casosid/integrantes/:integrantesid
    try {
        let data = {...req.body,...req.params};
        let casos = new CasosModule(data);
        let integrantes = new IntegrantesModule(data);
        let pool =  await sql.connect(config);
        let response = await pool.request()
        .input('id', sql.Int, casos.id)
        .input('titulo',sql.NVarChar(100),casos.titulo)
        .input('cuerpo',sql.NText,casos.cuerpo)
        .input('tipo',sql.TinyInt,casos.tipo)
        .input('imagenEncabezado',sql.VarChar, casos.imagenEncabezado)
        .input('usuarioCreador',sql.Int,casos.usuarioCreador)
        .input('proyecto',sql.VarChar(100),casos.proyecto)
        .query(casos.queryUpdate);

        let result = await pool.request()
        .input('id_', sql.Int, casos.id)
        .input('proyecto',sql.VarChar(100), casos.proyecto)
        .input('nombre',sql.VarChar(255),casos.nombre)
        .input('correo',sql.VarChar(255),casos.correo)
        .query(casos.queryUpdateIntegrantes);
        


        res.status(200).json({message: "Modificado correctamente",data:data})

    } catch (error) {
        console.error(`Hay clavo tio ${error}`)
        res.status(300).json({error:`Hay clavo tio ${error}`})
    }
})

router.delete('/casos/:id',async(req, res)=>{
    try {
        let data = {...req.body,...req.params};
        let casos = new CasosModule(data);
        let pool = await sql.connect(config);
        let response = await pool.request()
            .input('id',sql.Int,casos.id)
            .query(casos.queryDelete);
        res.status(200).json({message:"Datos han sido Eliminados"})
    } catch (error) {
        
    }
})

module.exports = router;