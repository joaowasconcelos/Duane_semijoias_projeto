async function dados() {

    try {
        responseProd = await axios.get(`${localStorage.getItem("ip")}SelecionaProduto`);
        console.log("qqq",responseProd.data)

        if (responseProd != null || responseProd != undefined) {
            criarTabela();
            carregaDadosProd();

            try {
                const response = await axios.get(`${localStorage.getItem("ip")}SelecionaCategoria`);
                console.log(response.data,"não estou entendendo ");
                //criaDrop(response.data);

            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
            }

            //console.log(responseProd.data)
        }
        return responseProd.data

    } catch (error) {   
        console.error('Erro ao buscar dados da API:', error);
    }

}

dados();

async function pegaId(id) {
    console.log('ID:', id);
}

//tabela de categorias do banco

function criaDrop(data) {
    const selecionaElemento = document.getElementById('categoria');
    selecionaElemento.innerHTML = ""
    data.forEach((item) => {
        const opcao = document.createElement('option');
        opcao.value = item.id;
        opcao.text = item.tipo;
        selecionaElemento.appendChild(opcao);
    });
}

let responseProd;

var table;

function criarTabela() {
    table =
        `
        <thead>
            <tr>
                <th id="qtdeCat">Categoria</th>
                <th id="produto">Produto</th>
                <th id="preco">Preço normal:</th>
                <th id="iconesTh"></th>
                <th id="iconesTh"></th>
            </tr>
        </thead>`
}

//onSelect="pegaId('${this['id']}')"

function carregaDadosProd() {

    $.each(responseProd.data, function () {
        table +=
            `
            <tr>
                <td id="dados" class="centralizar">${this['tipo']}</td>
                <td id="dados">${this['nome_produto']}</td>
                <td id="dados" class="centralizar">${this['preco_normal']}</td>
                <td>
                    <svg data-toggle="modal" data-target="#exampleModalCenter" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                    style="color: #9B5377" fill="currentColor" class="bi bi-pencil-fill" 
                                    viewBox="0 0 16 16" onClick="dadosPedido(${this['id']})" >
                                    <path
                                        d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                    
                    </svg>
                </td>
                <td>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                    style="color: #9B5377" fill="currentColor" class="bi bi-trash3-fill"
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

//puxando detalhes do pedido

async function dadosPedido(id) {

    try {
        
        const dadosP = await dados();
        const dadosCat = await axios.get(`${localStorage.getItem("ip")}SelecionaCategoria`);

        //console.log("aaaaaaaaa",dadosP)
        //console.log("aaaaaaaaa",dadosCat)
        criaDrop(dadosCat.data);

        const produto = dadosP.filter(produto => produto.id === id)
        produto.innerHTML = ""

        if (produto.length > 0) {

            const item = produto[0];
            document.getElementById('id').value = item.id;
            document.getElementById('categoria').value = item.tipo;
            document.getElementById('item').value = item.nome_produto;
            document.getElementById('descricao').value = item.descricao;
            document.getElementById('valor').value = item.preco_normal;

            const imagem = item.imagens;
            console.log(imagem)

            const divDados = document.getElementById('imagens-container');

            // Limpa as imagens existentes antes de adicionar as novas
            divDados.innerHTML = "";
            
            // Adiciona as novas imagens
            imagem.forEach((url) => {
                const imgElement = document.createElement('img');
                imgElement.src = url;
                imgElement.style.marginRight = "10px"; // Exemplo de estilo para espaçamento
                imgElement.style.width = "100px"; // Ajusta o tamanho, se necessário
            
                // Adiciona evento para exibir a imagem em destaque no modal, se necessário
                imgElement.addEventListener('click', () => {
                    exibirImagemNoModal(url);
                });
            
                divDados.appendChild(imgElement);
            });
            

        } else {
            console.warn("Produto com o ID fornecido não foi encontrado.");
        }

        console.log(produto);

    } catch (error) {

        console.error('Erro ao buscar produto:', error);
        showNotification("Ocorreu um erro ao buscar o produto. Tente novamente.");

    }

}

///ModificarProduto/:id