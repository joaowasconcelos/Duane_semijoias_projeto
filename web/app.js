const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/publico`))

app.get(`/`, function (req,res) {
    res.sendFile(`${__dirname}/publico/html/admInicio.html`)
});

app.get(`/home`, function (req,res) {
    res.sendFile(`${__dirname}/publico/html/home.html`)
});

app.get(`/login`, function (req,res) {
    res.sendFile(`${__dirname}/publico/html/login.html`)
});

app.listen(4000, () => {
    console.log('Servidor rodando na porta 4000');
});