const axios = require("axios");

console.log("entrou");

const api = axios.create({ baseURL: 'http://10.0.3.94:3000' });

module.exports = api;
