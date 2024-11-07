//puxando tabela de categorias do banco
let responseTipo;
let responsePed;

async function dados() {
    try {
        const token = localStorage.getItem('token');
        await axios.get(
            `${localStorage.getItem("ip")}SelecionaCategoria`,
            {
                headers: {
                    'x-access-token': token
                }
            }).then(response => {
                responseTipo = response.data
                if (responseTipo != null || responseTipo != undefined) {
                    criarTabela();
                    carregaDadosModalCategoria(responseTipo);
                }
            }).catch(error => {
                console.log(error);
            });


        await axios.get(
            `${localStorage.getItem("ip")}SelecionaPedido`,
            {
                headers: {
                    'x-access-token': token
                }
            }

        ).then(response => {
            responsePed = response.data
            if (responsePed != null || responsePed != undefined) {
                criarTabela2();
                carregaDadosTabelaPedidos(responsePed)
                console.log(responsePed)
            }
        }).catch(error => {
            console.log(error);
        });

    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }

}

dados();

var table;

function criarTabela() {
    table = `
    <thead>
        <tr>
            <td id="desc" class="tituloD">Descrição</td>
            <td></td>
            <td></td>
        </tr>
    </thead>`;
}

function carregaDadosModalCategoria(responseTipo) {
    $.each(responseTipo, function () {
        table +=
            `<tr>
            <td id="desc" class="selectIdProd" data-id="${this['id']}">${this['tipo']}</td>
            <td class="btnMod"><a href="#" onclick="changeSubtitle(this)" id="edit">Editar</a></td>
          <td class="btnMod"><a href="#" id="excluir" data-id="${this['id']}" onclick="confirmarExclusao(this)">Excluir</a></td>
        </tr>`;
    });

    document.getElementById('tbl-categorias').innerHTML = table;
}

//puxando tabela de pedidos do banco
var table2;

function criarTabela2() {
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

function carregaDadosTabelaPedidos(responsePed) {
    $.each(responsePed, function () {
        table2 +=
            `<tbody>
        <tr>
            <td id="codigo">${this['id']}</td>
            <td id="dtCompra" >${this['data_formatada']}</td>
            <td><a class="link" data-id="${this['id']}" data-toggle="modal" data-target=".bd-example-modal-sm" onclick="pegaId('${this['id']}')">Ver mais detalhes...</a></td>
            <td id="status">${this['status']}</td>
        </tr>
        </tbody>`
    });
    document.getElementById('tbl-pedidos').innerHTML = table2;
}

const form = document.getElementById('envia-form'); // Define `form` no escopo global
const elemento = document.getElementById('tipo');

//função para alterar o formulário 
function changeSubtitle(link) {

    document.getElementById('subtitleCadastradas').textContent = 'Qual o novo nome da categoria?';
    document.getElementById('titleCadastradas2').textContent = 'Edite a categoria escolhida';

    const td = link.closest('tr').querySelector('#desc').innerHTML;
    const id = link.closest('tr').querySelector('td').getAttribute('data-id');

    elemento.setAttribute('data-id', id);
    elemento.value = td;

    btnSave.setAttribute('data-id', id);

    console.log(elemento)
    console.log(td);
    console.log(form.method)
    console.log(id)

    return false;
}

///MeuPedido/:id

async function pegaId(id) {
    console.log('ID capturado:', id);
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(`${localStorage.getItem("ip")}MeuPedido/${id}`, {
            headers: {
                'x-access-token': token
            }
        });
        
        console.log(response.data);

    } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        showNotification("Ocorreu um erro ao buscar os detalhes do pedido. Tente novamente.");
    }
}



const btnSave = document.getElementById('salvando');

btnSave.addEventListener('click', function (link) {
    const id = btnSave.getAttribute('data-id');
    elemento.setAttribute('data-id', id);
    if (!id) {
        post();
    } else {
        put();
    }

});

async function put() {
    const token = localStorage.getItem('token');
    const tipo = document.getElementById("tipo").value;
    const id = document.getElementById("tipo").getAttribute('data-id');
    try {
        await axios.post(`${localStorage.getItem("ip")}ModificaCategoria/${id}`,
            {
                tipo: tipo
            },
            {
                headers: {
                    'x-access-token': token
                }
            }).then(response => {
                showNotification(response.data.message)
                document.getElementById('tipo').value = '';
                fecharModal();

                setTimeout(() => {
                    window.location.reload(true);
                }, 4000)
            }).catch(error => {
                showNotification(error.response.data.error)
            })
    } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
        showNotification("Ocorreu um erro ao editar categoria. Tente novamente.");
    }

}

function fecharModal() {
    $('#exampleModalCenter').modal('hide');
}

//função para cadastrar
async function post() {
    const token = localStorage.getItem('token');
    const tipo = document.getElementById("tipo").value;

    try {
        const response = await axios.post(
            `${localStorage.getItem("ip")}CreateCategoria`,
            {
                tipo: tipo
            },
            {
                headers: {
                    'x-access-token': token
                }
            }
        ).then(response => {
            showNotification(response.data.message)
            document.getElementById('tipo').value = '';
            fecharModal();
            setTimeout(() => {
                window.location.reload(true);
            }, 2000)
        }).catch(error => {
            showNotification(error.response.data.error);
        });
    } catch (error) {
        console.error('Erro ao cadastrar nova Categoria:', error);
        showNotification("Ocorreu um erro ao cadastrar nova Categoria. Tente novamente.");
    }
}

function confirmarExclusao(link) {
    const id = link.getAttribute('data-id');
    const confirmation = confirm("Você tem certeza que deseja excluir este item?");

    if (confirmation) {
        excluir(id);
    }
}

async function excluir(id) {
    const token = localStorage.getItem('token');
    try {
        await axios.post(`${localStorage.getItem("ip")}InativaCategoria/${id}`,
            {},
            {
                headers: {
                    'x-access-token': token
                }
            }
        ).then(response => {
            showNotification(response.data.message)
            fecharModal();
            setTimeout(() => {
                window.location.reload(true);
            }, 2000)
        }).catch(error => {
            showNotification(error.response.data.error);
        });
    } catch (error) {
        console.error('Erro ao cadastrar nova Categoria:', error);
        showNotification("Ocorreu um erro ao cadastrar nova Categoria. Tente novamente.");
    }
}

async function DetalhesPedido(id) {
    const token = localStorage.getItem('token');
    try {
        await axios.get(`${localStorage.getItem("ip")}MeuPedido/${id}`,
            {
                headers: {
                    'x-access-token': token
                }
            }).then(response => {
                console.log(response.data)

            }).catch(error => {
                console.log(error)
            })

    } catch (error) {
        console.error('Erro ao cadastrar nova Categoria:', error);
        showNotification("Ocorreu um erro ao cadastrar nova Categoria. Tente novamente.");
    }
}

function apiIp() {
    const ip = "http://10.0.3.77:3000/"
    localStorage.setItem('ip', ip);
}

apiIp()




// function Verdetalhes(link) {
//     const id = link.getAttribute('data-id');
//     DetalhesPedido(id)

// }

