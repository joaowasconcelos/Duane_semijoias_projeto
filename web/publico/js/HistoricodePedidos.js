async function dados() {
    try {
        // Fazendo a requisição com axios.get
        responsePed = await axios.get('http:///192.168.3.9:3000/');
        console.log(responsePed.data)

        if(responsePed != null || responsePed != undefined){
            criarTabela();
            carregaDadosTabelaPedidos();
        }

    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

dados();

var table2;

function criarTabela(){
    table2 = `
        <tr>
            <td id="codigot">Código</td>
            <td id="dtComprat">Data de compra</td>
            <td id="descricaott">Informações do pedido</td>
            <td id="statust">Status</td>
        </tr>`
}

function carregaDadosTabelaPedidos(){
    
    $.each(responsePed.data, function () {
        table2 += 
        `<tbody>
        <tr>
            <td id="codigo">${this['id']}</td>
            <td id="dtCompra" >${this['data_formatada']}</td>
            <td id="">${this['']}</td>
            <td id="status">${this['status']}</td>
        </tr>
        </tbody>`
    });
    console.log(table2);
    
    document.getElementById('tbl-pedidos').innerHTML = table2;
}