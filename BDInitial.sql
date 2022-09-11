
CREATE TABLE Usuario(
	id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	usuario varchar(50),
	contrasena varchar(150),
	correo varchar(70) 
);

CREATE TABLE Post(
	id int PRIMARY KEY NOT NULL IDENTITY(1,1) ,
	tipo tinyint,
	titulo varchar(100),
	imagenEncabezado varchar(200),
	cuerpo ntext,
	usuarioCreador int,
	fechaCreado datetime, 
	proyecto VARCHAR(100),
	seccionCasos VARCHAR
);
CREATE TABLE Evento(
	id int PRIMARY KEY IDENTITY(1,1),
	titulo varchar(100),
	descripcion varchar(max),
	horaInicio time,
	duracion time,
	fecha date,
	semana varchar(20),
	lugar int,
	usuarioCreador int,
	fechaCreado datetime,
);

CREATE TABLE SitioEvento(
	id int PRIMARY KEY IDENTITY(1,1),
	evento int,
	lugarSede int,
	sede int,
)

CREATE TABLE OrganizadorEvento(
	id int PRIMARY KEY IDENTITY(1,1),
	evento int,
	organizador int,
	sede int,
)

CREATE TABLE LugarSede (
	id int PRIMARY KEY IDENTITY(1,1),
	nombre varchar(100),
  sede int,
);

CREATE TABLE Sede (
		id int PRIMARY KEY IDENTITY(1,1),
		nombre varchar(100),
);

CREATE TABLE Organizador (
	id int PRIMARY KEY IDENTITY(1,1),
	nombre varchar(100)
);

CREATE TABLE Postulacion(
	id int IDENTITY(1,1) NOT NULL PRIMARY KEY ,
	representante varchar(70),
	correo varchar(70),
	cuenta varchar(20),
	celular varchar(20),
	genero tinyint,
	tipo int, -- IDEA O EMPRENDIMIENTO
	descripcion varchar(200),
	sede int,
	equipoTrabajo tinyint, --si o no
	redesSociales tinyint, --si o no
	rubro tinyint, -- de la tabla rubo
	expectativas tinyint, -- de la tabla expectativas
	fechaCreado datetime,
	fechaCerrado datetime,
	estado tinyint --de la tabla estado
);


CREATE TABLE PostulacionBitacora(
	id int IDENTITY(1,1) NOT NULL,
	postulacion int,
	fecha datetime,
	descripcion varchar(max),
	usuario int 
);
	

CREATE TABLE Rubro(
	id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	descripcion varchar(100),
);
CREATE TABLE Expectativa(
	id int IDENTITY(1,1) NOT NULL,
	descripcion varchar(100),
);


CREATE TABLE Estado(
	id int IDENTITY(1,1) NOT NULL,
	descripcion varchar(100),
);

CREATE TABLE Contactanos(
	id int IDENTITY(1,1) NOT NULL,
	comentario varchar(300),
	nombre varchar(50),
	email varchar(70),
	telefono varchar(20),
);

CREATE TABLE Integrantes (
  [id] integer PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [nombre] varchar(100),
  [correo] nvarchar(255),
  [proyecto] nvarchar(255) 
  
);

--tablas nuevas agregadas
CREATE TABLE [paginaInicio] (
  [id] integer PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [titulo] varchar(250),
  [subtitulo] varchar(250)
)
GO

CREATE TABLE [carousel] (
  [id] integer PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [titulo] varchar(250),
  [seccion] varchar(100),
  [detalles] varchar(250)
)
GO

CREATE TABLE [quienesSomos] (
  [id] integer PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [descripcion] varchar(300)
)
GO

CREATE TABLE [nuestroEquipo] (
  [id] integer PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [integrante] varchar(250),
  [descripcion] varchar(300),
  [subtitulo] varchar(250)
)
GO
