//puxando tabela clientes
let responseCli;

async function dados() {
    try {
        // Fazendo a requisição com axios.get
        responseCli = await axios.get('http://10.0.3.77:3000/SelecionaUsuarios');
        console.log(responseCli.data)

        if(responseTipo != null || responseTipo != undefined){
            criarTabela();
            carregaDadosCli();
            console.log("123")
        }

    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

dados();


var table;

function criarTabela(){
    table = `<tr>
    <td>Nome</td>
    <td>Email</td>
    <td>Dados</td>
    </tr>`
}

function carregaDadosCli(){
    // console.log(responseTipo.data);
    
    $.each(responseTipo.data, function () {
        table += 
        `<tr>
        <td>${this['tipo']}</td>
        <td><a href="/editar/${this["id"]}">editar</a></td>
        </tr>`
    });
    console.log(table);
    
    document.getElementById('tbl-clientes').innerHTML = table;
}