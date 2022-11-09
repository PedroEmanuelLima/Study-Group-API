const dotenv = require("dotenv").config();
const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();

const storage = require('./src/config/MulterConfig');
const RouterEstudante = require('./src/Routes/Estudante');

try{
    mongoose.connect(process.env.DB_STR_CON);
} catch (error) {
    console.log("Erro durante a conexão com MongoDB");
}

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/src/page/info.html'));
});

app.use(RouterEstudante);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server start!')
});