//puxando tabela clientes
let responseCli;

async function dados() {
    try {
        // Fazendo a requisição com axios.get
        await axios.get('http://10.0.3.77:3000/SelecionaUsuarios')
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

var table;

function criarTabela() {
    table = 
    `<thead>
        <tr>
            <td id="titulo">Nome</td>
            <td id="titulo">Email</td>
            <td id="dados">Dados</td>
        </tr>
    </thead>`
}

function carregaDadosCli(response) {
    $.each(response.data, function () {
        table +=
            `<tr>
                <td>${this['nome']}</td>
                <td>${this['usuario']}</td>
                <td  id="dados"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" style="color: #9B5377;" fill="currentColor" class="bi bi-clipboard-check-fill" viewBox="0 0 16 16">
                      <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
                      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                    </svg>
                </td>
             </tr>`
    });
    //console.log(table);

    document.getElementById('tbl-clientes').innerHTML = table;
}