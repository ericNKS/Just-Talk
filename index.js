const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const database = "./database/database";
const connection = require(database);
const port = 8080;
const app = express();

// Session
let tempoSession = 3600000;

app.use(session({
    secret: "Eu amo minha fernanda",
    cookie: {
        maxAge: tempoSession
    }
}))

// database
connection
    .authenticate()
    .then(()=>{
        console.log("Conexao fetia com sucesso");
    })
    .catch((e)=>{
        console.log(e);
    });

// Models
const User = require('./App/User/User');
const Amizade = require('./App/User/Amizade/Amizade');
const Conteudo = require('./App/Conteudo/Conteudo');

// Controllers
const JustTalkController = require('./App/Just_talk/JustTalkController');
const UserController = require('./App/User/UserController');
const AmizadeController = require('./App/User/Amizade/AmizadeController');
const ConteudoController = require('./App/Conteudo/ConteudoController');

// View engine
app.set("view engine", "ejs");

// definindo a pasta publica
app.use(express.static('public'));

// Usando o bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// JUST TALK routes
app.use('/', JustTalkController);
app.use('/', UserController);
app.use('/', AmizadeController);
app.use('/', ConteudoController);



// app escutando
app.listen(port,()=>{
    console.log("O just Talk esta rodando");
});