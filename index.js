const express= require('express');
const app = express();
const cors = require('cors');

app.use('/images',express.static(__dirname +'/uploads'));

app.set('port',process.env.PORT || 5000);
app.set('json spaces',2);
app.use(express.json());
app.use(cors());

app.use('/1.0.0',require('./src/1.0.0/routes/post')) // Endpoint para el modulo de recursos
app.use('/1.0.0',require('./src/1.0.0/routes/Casos'))//
app.use('/1.0.0',require('./src/1.0.0/routes/Usuario'))
app.use('/1.0.0',require('./src/1.0.0/routes/Postulacion'))
app.use('/1.0.0',require('./src/1.0.0/routes/imagenes'))
app.use('/1.0.0',require('./src/1.0.0/routes/Contactanos'))

const server = app.listen(app.get('port'),(req,res)=>{
    console.log(`Server started at http://localhost:${app.get('port')}`)
  })
  