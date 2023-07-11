const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const database = "./database/database";
const connection = require(database);
const port = 8080;
const app = express();

// Session
app.use(session({
    secret: "Eu amo minha fernanda",
    cookie: {
        maxAge: 600000
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
const User = require('./User/User');

// Controllers
const JustTalkController = require('./Just_talk/JustTalkController');
const UserController = require('./User/UserController');

// View engine
app.set("view engine", "ejs");

// definindo a pasta publica
app.use(express.static('Public'));

// Usando o bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// JUST TALK routes
app.use('/', JustTalkController);
app.use('/', UserController);



// app escutando
app.listen(port,()=>{
    console.log("O just Talk esta rodando");
});