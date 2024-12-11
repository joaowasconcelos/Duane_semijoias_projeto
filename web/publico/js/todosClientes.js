//puxando tabela clientes
let responseCli;

async function dados() {
    try {
        // Fazendo a requisição com axios.get
        await axios.get(`${localStorage.getItem("ip")}SelecionaUsuarios`)
            .then(response => {
                console.log(response);
                criarTabela();
                carregaDadosCli(response);

            }).catch(error => {
                console.log(error);
            })
        // console.log(responseCli.data)


    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

dados();

let table = ''; // Variável global para montagem da tabela

// Função para criar o cabeçalho da tabela
function criarTabela() {
    table = `
        <thead>
            <tr>
                <th>Nome</th>
                <th class="email">Email</th>
                <th>Dados</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    document.getElementById('tbl-clientes').innerHTML = table;
}

// Função para carregar os dados dos clientes
function carregaDadosCli(response) {
    const tbody = document.querySelector('#tbl-clientes tbody');
    let rows = '';

    $.each(response.data, function () {
        rows += `
            <tr>
                <td>${this['nome']}</td>
                <td>${this['usuario']}</td>
                <td>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" style="color: #9B5377;" fill="currentColor" class="bi bi-clipboard-check-fill " data-toggle="modal" viewBox="0 0 16 16" data-target="#exampleModalCenter" onClick="dadosCli(${this['id']})">
                        <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                    </svg>
                </td>
            </tr>`;
    });

    tbody.innerHTML = rows; //linhas no corpo da tabela
}

// Barra de pesquisa
document.getElementById('pesquisa').addEventListener('input', function () {
    const pesquisar = this.value.toLowerCase(); // texto digitado
    const linhasTabela = document.querySelectorAll('#tbl-clientes tbody tr'); //seleciona as linhas

    linhasTabela.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        if (rowText.includes(pesquisar)) {
            row.style.display = ''; //mostra a linha
        } else {
            row.style.display = 'none'; //esconde a linha
        }
    });
});

function formatarData(dataISO) {
    const data = new Date(dataISO); // Cria um objeto Date a partir da string ISO
    const dia = String(data.getDate()).padStart(2, '0'); // Pega o dia e adiciona zero à esquerda se necessário
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses começam do 0
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

//modal

async function dadosCli(id) {
    try {
        await axios.get(`${localStorage.getItem("ip")}SelecionaUsuarios`)
            .then(response => {
                //console.log(response.data);
                const cliente = response.data;
                console.log(cliente)

                if (cliente.length > 0) {
                    const clienteSelecionado = cliente.find(c => c.id === id);
                
                    if (clienteSelecionado) {

                        const dataNasc = clienteSelecionado.data_nasc;

                        document.getElementById('id').value = clienteSelecionado.id;
                        document.getElementById('nome').value = clienteSelecionado.nome;
                        document.getElementById('email').value = clienteSelecionado.usuario;
                        document.getElementById('data_nasc').value = formatarData(dataNasc);
                    } else {
                        console.log('Cliente não encontrado.');
                    }
                }
                

            }).catch(error => {
                console.log(error);
            })




    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        showNotification("Ocorreu um erro ao buscar o cliente. Tente novamente.");
    }
}
