const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/publico`))

app.get(`/`, function (req,res) {
    res.sendFile(`${__dirname}/publico/html/header.html`)
});

app.listen(4000, () => {
    console.log('Servidor rodando na porta 4000');
});