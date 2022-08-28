module.exports = class Integrantes{
    constructor(data, filter){
        this.db = 'Integrantes'
        this.id= data.id || '';
        this.nombre = data.nombre || '';
        this.correo = data.correo || '';
        this.proyecto= data.proyecto || '';

        this.queryGetFirst10=`
        SELECT TOP 10
            id
            ,nombre
            ,correo
            ,proyecto
            FROM Integrantes`

        this.queryGetById=` SELECT 
            id
            ,nombre
            ,correo
           ,proyecto
            FROM Integrantes
            WHERE id=@id
            ORDER BY proyecto;`
        
        this.queryInsert=`INSERT INTO ${this.db} 
        (nombre ,correo, proyecto) 
        VALUES 
        (@nombre,@correo, @proyecto);`

       
            
        this.queryDelete = `DELETE FROM ${this.db} WHERE id=@id`
    }
}