const dotenv = require("dotenv").config();
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();


try{
    mongoose.connect(process.env.DB_STR_CON);
} catch (error) {
    console.log("Erro durante a conexão com MongoDB");
}

app.use(express.json());
app.use(cors());

const authMiddleware  = require('./src/middlewres/auth');
app.get('/', authMiddleware, (req, res) => res.status(200).json({token: "Valido"}));


const EstudanteRoutes = require('./src/Routes/Estudante');
const GrupoRoutes = require('./src/Routes/Grupo');
const DocumentoRoutes = require('./src/Routes/Document');

app.use("/estudante", EstudanteRoutes);
app.use("/grupo", GrupoRoutes);
app.use("/documento", DocumentoRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server start!')
});