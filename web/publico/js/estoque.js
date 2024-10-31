async function dados() {
    try {
        // Fazendo a requisição com axios.get
        responseProd = await axios.get(`${localStorage.getItem("ip")}SelecionaProduto`);
        console.log(responseProd.data);

        if (responseProd != null) {
            criarTabela();
            carregaDadosProd();
        }

    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

dados();

let responseProd;
let table;

function criarTabela() {
    table =
        `
        <thead>
            <tr>
                <th id="qtdeCat">Categoria</th>
                <th id="produto">Produto</th>
                <th id="descricao">Descrição</th>
                <th id="preco">Quantidade</th>
                <th>Ação</th>
            </tr>
        </thead>`;
}
function carregaDadosProd() {
    $.each(responseProd.data, function (index, item) {
        table +=
            `
            <tr id="produto-${item.id}">
                <td class="centralizar">${item.tipo}</td>
                <td>${item.nome_produto}</td>
                <td class="centralizar">${item.descricao}</td>
                <td class="centralizar">${item.quantidade}</td>
                <td>
                    <input type="number" id="quantidade-${index}" class="quantidade-input">
                </td>
                <td>
                    <button onclick="Salvar(${index}, '${item.id}')">Salvar</button>
                </td>
            </tr>`;
    });

    document.getElementById('tbl-produtos').innerHTML = table;
}

async function Salvar(index, id) {
    const inputElement = document.getElementById(`quantidade-${index}`);
    const vlDados = inputElement.value;
    console.log(`Valor da quantidade para o produto com índice ${index} e ID ${id}:`, vlDados);

    try {
        await axios.post(`${localStorage.getItem("ip")}`,{

        },
        {

        }).then(response =>{
            console.log(response)
        }).catcha(error =>{
            console.log(error)
        })
    } catch (error) {
        console.log(error)
    }
}
