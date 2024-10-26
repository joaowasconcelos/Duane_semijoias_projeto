//puxando tabela de categorias do banco
let responseTipo;
let responsePed;

async function dados() {
    try {
        // Fazendo a requisição com axios.get
        responsePed = await axios.get('http:///10.0.3.77:3000/SelecionaPedido');
        responseTipo = await axios.get('http:///10.0.3.77:3000/SelecionaCategoria');
        console.log(responsePed.data)
        console.log(responseTipo.data)

        if (responseTipo != null || responseTipo != undefined) {
            criarTabela();
            carregaDadosModalCategoria();
            // console.log("123")
        }

        if (responsePed != null || responsePed != undefined) {
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

function criarTabela() {
    table = `
    <thead>
        <tr>
            <td id="desc" class="tituloD">Descrição</td>
            <td></td>
            <td></td>
        </tr>
    </thead>`
}

function carregaDadosModalCategoria() {
    // console.log(responseTipo.data);

    $.each(responseTipo.data, function () {
        table +=
            `<tr>
            <td id="desc" class="selectIdProd" data-id="${this['id']}">${this['tipo']}</td>
            <td class="btnMod"><a href="#" onclick="changeSubtitle(this)" id="edit" >Editar</a></td>
            <td class="btnMod">Excluir</td>
        </tr>`
    });
    // console.log(table);

    // <td><a href="/editar/${this["id"]}" onclick="changeSubtitle()">Editar</a></td>

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

function carregaDadosTabelaPedidos() {

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
    //console.log(table2);

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

//IDENTIFICAR SE O ELEMENTO DO CAMPO INPUT POSSUI ID
//SE TIVER ID É POST
//SE NÃO É GET

const btnSave = document.getElementById('salvando');

btnSave.addEventListener('click', function (link) {

    // console.log("entrou")
    const id = btnSave.getAttribute('data-id');
    elemento.setAttribute('data-id', id);

    console.log(id)

    if (!id) {
        console.log("id é uma string vazia ou null");
        // post();
    } else {
        console.log("id possui um valor válido");
        put();
    }

});

// ModificaCategoria/:id  UPDATE
// CreateCategoria


// //função para editar
async function put() {

    const token = localStorage.getItem('token');
    console.log(token)
    const tipo = document.getElementById("tipo").value;
    const id = document.getElementById("tipo").getAttribute('data-id');


    try {
        const response = await axios.post(`http://10.0.3.77:3000/ModificaCategoria/${id}`,
            
            {
                tipo: tipo
            },
            {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            }

        );
        console.log(response.data);

    } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
        alert("Ocorreu um erro ao editar categoria. Tente novamente.");
    }

    document.getElementById('tipo').value = '';
    window.location.reload(true);
}


//função para cadastrar
async function post() {

    const token = localStorage.getItem('token');
    const tipo = document.getElementById("tipo").value;
    const id = document.getElementById("tipo").getAttribute('data-id');

    try {
        const response = await axios.post('http://10.0.3.77:3000/CreateCategoria',

            {
                headers: {
                    'x-access-token': token
                }
            },
            {
                id: id,
                tipo: tipo
            }

        );
        console.log(response.data);

    } catch (error) {
        console.error('Erro ao cadastrar nova Categoria:', error);
        alert("Ocorreu um erro ao cadastrar nova Categoria. Tente novamente.");
    }

    document.getElementById('tipo').value = '';
    window.location.reload(true);
}