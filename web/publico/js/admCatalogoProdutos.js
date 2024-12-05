async function dados() {

    try {
        responseProd = await axios.get(`${localStorage.getItem("ip")}SelecionaProduto`);
        //console.log("qqq",responseProd.data)

        if (responseProd != null || responseProd != undefined) {
            criarTabela();
            carregaDadosProd();

            try {
                const response = await axios.get(`${localStorage.getItem("ip")}SelecionaCategoria`);
                //console.log(response.data, "não estou entendendo ");
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
    selecionaElemento.innerHTML = "";
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
                                    viewBox="0 0 16 16" onClick="excluir(${this['id']})" []>
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

        criaDrop(dadosCat.data);

        const produto = dadosP.filter(produto => produto.id === id)
        produto.innerHTML = ""

        if (produto.length > 0) {

            const item = produto[0];
            document.getElementById('id').value = item.id;
            document.getElementById('categoria').select = item.tipo;
            document.getElementById('item').value = item.nome_produto;
            document.getElementById('descricao').value = item.descricao;
            document.getElementById('valor').value = item.preco_normal;

            const imagem = item.imagens;
            //console.log(imagem)

            const divDados = document.getElementById('imagens-container');
            divDados.innerHTML = "";

            imagem.forEach((url) => {
                const imgElement = document.createElement('img');
                imgElement.src = url;
                imgElement.style.marginRight = "10px";
                imgElement.style.width = "100px";

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

async function excluir(id) {
    const token = localStorage.getItem('token');

    const ip = localStorage.getItem("ip");
    console.log(`URL: ${ip}InativaProduto/${id}`);

    try {
        await axios.put(`${localStorage.getItem("ip")}InativaProduto/${id}`,
            {},
            {
                headers: {
                    'x-access-token': token
                }
            }
        ).then(response => {
            showNotification(response.data.message)
            setTimeout(() => {
                window.location.reload(true);
            }, 2000)
        }).catch(error => {
            showNotification(error.response.data.error);
        });
    } catch (error) {
        console.error("Erro ao excluir o produto:", error);
        throw new Error("Erro ao excluir o produto.");
    }
}

document.getElementById('pesquisa').addEventListener('input', function () {
    const pesquisar = this.value.toLowerCase(); // texto digitado
    const linhasTabela = document.querySelectorAll('#tbl-produtos tbody tr'); //seleciona as linhas

    linhasTabela.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        if (rowText.includes(pesquisar)) {
            row.style.display = ''; //mostra a linha
        } else {
            row.style.display = 'none'; //esconde a linha
        }
    });
});

// async function salvar() {
//     const token = localStorage.getItem('token');
//     const ID = document.getElementById("tipo").getAttribute('data-id');;

//     console.log("Id do produto:", ID)

//     // const tipo = document.getElementById('categoria').select;
//     // const item = document.getElementById('item').value;
//     // const descricao = document.getElementById('descricao').value;
//     // const valor = document.getElementById('valor').value;

//     // try {
//     //     await axios.post(`${localStorage.getItem("ip")}ModificarProduto/${id}`,
//     //     {
//     //         tipo: tipo,
//     //         item: item,
//     //         descricao: descricao,
//     //         valor: valor
//     //     },
//     //     {
//     //         headers: {
//     //             'x-access-token': token
//     //         }
//     //     }). then (response => {
//     //         showNotification(response.data.message)

//     //         setTimeout(() => {
//     //             window.location.reload(true);
//     //         }, 4000)
//     //     }).catch(error => {
//     //             showNotification(error.response.data.error)
//     //         })
//     // } catch (error) {
//     //     console.error('Erro ao atualizar produto:', error);
//     //     showNotification("Ocorreu um erro ao editar produto. Tente novamente.");
//     // }
// }



//pesquisa



