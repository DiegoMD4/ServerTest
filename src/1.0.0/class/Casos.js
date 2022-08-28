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
        dbo.Post.id 
        ,tipo
        ,titulo
        ,cuerpo
        ,imagenEncabezado
        ,usuarioCreador
        ,fechaCreado
        ,nombre 
        ,correo 
        ,Integrantes.proyecto
        FROM dbo.Post, dbo.Integrantes WHERE tipo = 2`//listo

        this.queryGetById=` SELECT 
        dbo.Post.id
        ,tipo
        ,titulo
        ,cuerpo
        ,imagenEncabezado
        ,usuarioCreador
        ,fechaCreado
        ,nombre 
        ,correo 
        ,Integrantes.proyecto
        FROM dbo.Post, dbo.Integrantes
        WHERE dbo.Post.id=@id AND tipo = 2
        ORDER BY fechaCreado;` //listo
        
        this.queryInsert=`INSERT INTO ${this.db} 
        (tipo ,titulo,cuerpo,imagenEncabezado,usuarioCreador,fechaCreado, proyecto) 
        VALUES 
        (2 ,@titulo,@cuerpo,@imagenEncabezado,@usuarioCreador,GETDATE(), @proyecto);`//listo

        this.queryUpdate=`UPDATE ${this.db} SET 
            titulo=@titulo,
            cuerpo=@cuerpo,
            imagenEncabezado=@imagenEncabezado,
            usuarioCreador=@usuarioCreador,
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