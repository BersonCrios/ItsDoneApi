const express  = require('express');

const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors')

const config = require('./Config/config');


//MONGOOSE E MONGO
const url = config.bd_string;
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err)=>{
    console.log("Erro na conexão com o BD: " + err);
});
mongoose.connection.on('disconected', ()=>{
    console.log("App desconnectada do BD");
});

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao BD!');
})

//BODY-PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS
app.use(cors())


//ROTAS
const indexRoutes = require('./Routes/index.route');
const userRoutes = require('./Routes/User.route');
const notesRoutes = require('./Routes/Notes.route');

app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/notes', notesRoutes);


app.listen(3000);

module.exports = app;