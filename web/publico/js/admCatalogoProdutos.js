async function dados() {
    try {
        // Fazendo a requisição com axios.get
        responseProd = await axios.get('http://192.168.3.9:3000/SelecionaProduto');
        console.log(responseProd.data)

        if (responseProd != null || responseProd != undefined) {
            criarTabela();
            carregaDadosProd();
            console.log("123")
        }

    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

dados();

let responseProd;

var table;

function criarTabela() {
    table =
        `
        <thead>
            <tr>
                <th id="qtdeCat">Quantidade</th>
                <th id="qtdeCat">Categoria</th>
                <th id="produto">Produto</th>
                <th id="preco">Preço normal:</th>
                <th id="preco">Preço promocional:</th>
                <th id="iconesTh"></th>
                <th id="iconesTh"></th>
            </tr>
        </thead>`
}


function carregaDadosProd() {

    $.each(responseProd.data, function () {
        table +=
            `
            <tr>
                <td id="dados" class="centralizar">${this['quantidade']}</td>
                <td id="dados" class="centralizar">${this['tipo']}</td>
                <td id="dados">${this['nome_produto']}</td>
                <td id="dados" class="centralizar">${this['preco_normal']}</td>
                <td id="dados" class="centralizar">${this['preco_promocional']}</td>
                <td>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                    style="color: #9B5377; margin-left: 35px;" fill="currentColor" class="bi bi-pencil-fill"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                    </svg>
                </td>
                <td>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                    style="color: #9B5377; margin-left: 35px;" fill="currentColor" class="bi bi-trash3-fill"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                </td>
            </tr>`
    });
    //console.log(table);

    document.getElementById('tbl-produtos').innerHTML = table;
}

