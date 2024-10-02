// Carregar cabeçalho HTML
fetch('./html/partials/headerAdm.html')
    .then(response => response.text())
    .then(html => {
        const header = document.createElement('header');
        header.innerHTML = html;
        document.body.appendChild(header);
    })
    .catch(error => console.error('Erro ao carregar o cabeçalho:', error));

// Manipulação de modais
const fecharModais = () => {
    document.getElementById('dialog-box').showModal();
    document.getElementById('categoria').value = "";
}

const limparCampo = () => {
    document.getElementById('categoria').value = "";
}

const cadastrarNovaCategoria = () => {
    document.getElementById('categoria').value = "";
}

// Importação da API usando require
const teste = require("../../src/service/api.js"); // Ajuste o caminho conforme necessário

// Função para buscar dados
async function dados() {
    try {
        const response = await teste.get('/SelecionaPedido');
        console.log(response.data); // Use response.data para acessar os dados
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

// Chamar a função para obter dados
dados();
