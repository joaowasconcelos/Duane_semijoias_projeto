function changeSubtitle() {
    document.getElementById('subtitleCadastradas').textContent = 'Qual o novo nome da categoria?';
    document.getElementById('titleCadastradas2').textContent = 'Edite a categoria escolhida';
}

function salvar() {
    window.location.reload(true);
}

//puxando tabela de categorias do banco
let responseTipo;
let responsePed;

async function dados() {
    try {
        // Fazendo a requisição com axios.get
        responsePed = await axios.get('http://10.0.3.77:3000/SelecionaPedido');
        responseTipo = await axios.get('http://10.0.3.77:3000/SelecionaCategoria');
        console.log(responsePed.data)
        console.log(responseTipo.data)

        if(responseTipo != null || responseTipo != undefined){
            criarTabela();
            carregaDadosModalCategoria();
            // console.log("123")
        }

        if(responsePed != null || responsePed != undefined){
            criarTabela2();
            carregaDadosTabelaPedidos();
            // console.log("123")
        }

    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

dados();

var table;

function criarTabela(){
    table = `
    <thead>
        <tr>
            <td>Descrição</td>
            <td>Editar</td>
            <td>Excluir</td>
        </tr>
    </thead>`
}

function carregaDadosModalCategoria(){
    // console.log(responseTipo.data);
    
    $.each(responseTipo.data, function () {
        table += 
        `<tr>
        <td>${this['tipo']}</td>
        <td><a href="/editar/${this["id"]}">editar</a></td>
        </tr>`
    });
    // console.log(table);
    
    document.getElementById('tbl-categorias').innerHTML = table;
}

//puxando tabela de pedidos do banco

var table2;

function criarTabela2(){
    table2 = `

    <thead>
        <tr>
            <td id="codigot">Código</td>
            <td id="dtComprat">Data de compra</td>
            <td id="descricaott">Descrição</td>
            <td id="statust">Status</td>
        </tr>
    </thead>`
}

function carregaDadosTabelaPedidos(){
    
    $.each(responsePed.data, function () {
        table2 += 
        `<tbody>
        <tr>
            <td id="codigo">${this['id']}</td>
            <td id="dtCompra" >${this['data_formatada']}</td>
            <td><a href="#" id="link">Ver mais detalhes...</a></td>
            <td id="status">${this['status']}</td>
        </tr>
        </tbody>`
    });
    console.log(table2);
    
    document.getElementById('tbl-pedidos').innerHTML = table2;
}
