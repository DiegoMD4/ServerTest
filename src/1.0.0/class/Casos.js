module.exports = class Casos{
    constructor(data, filter){
        this.db = 'Post'
        this.id= data.id || '';
        this.tipo= data.tipo || ''; //casos
        this.titulo= data.titulo || '';
        this.cuerpo= data.cuerpo || ''; //descripcion
        this.imagenEncabezado= data.imagenEncabezado || '';
        this.usuarioCreador= data.usuarioCreador || '';
        this.fechaCreado= data.fechaCreado || '';
        this.proyecto= data.proyecto || '';

        this.queryGetFirst10=`
        SELECT 
        id
        ,tipo
        ,titulo
        ,cuerpo
        ,imagenEncabezado
        ,usuarioCreador
        ,fechaCreado
        FROM Post P
        WHERE tipo = 2`//listo

        this.queryGetById=` SELECT  
        id
        ,tipo
        ,titulo
        ,cuerpo
        ,usuarioCreador
        ,fechaCreado
        FROM Post P
        WHERE tipo = 2
        AND id = @id
        ORDER BY fechaCreado;` //listo
        
        this.queryInsert=`INSERT INTO ${this.db} 
        (tipo ,titulo,cuerpo,usuarioCreador,fechaCreado)
        OUTPUT INSERTED.id 
        VALUES 
        (2 ,@titulo,@cuerpo,@usuarioCreador,GETDATE());
        `//listo

        this.queryUpdate=`UPDATE ${this.db} SET 
            titulo=@titulo,
            cuerpo=@cuerpo,
            proyecto = @proyecto
            WHERE id=@id AND tipo=2;`
        this.queryDelete = `DELETE FROM ${this.db} WHERE id=@id AND tipo = 2`//LISTO

        this.queryUpdateIntegrantes=`UPDATE dbo.Integrantes SET 
        nombre = @nombre,
        correo = @correo,
        proyecto = @proyecto
        WHERE id = @id_ ;`
    }
}