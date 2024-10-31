let responsePromo;

async function dados() {
    try {
        const token = localStorage.getItem('token');

        //puxando promoçoes
        await axios.get(
            'http://10.0.3.77:3000/SelecionaPromocao',
            {
                headers: {
                    'x-access-token': token
                }
            }).then(response => {
                responsePromo = response.data
                console.log(responsePromo)
                if (responsePromo != null || responsePromo != undefined) {
                    criarTabela();
                    carregaPromos(responsePromo); // 
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
    table =
        `<thead>
        <tr>
            <td class="tituloTd">Tipo</td>
            <td class="tituloTd">Status</td>
            <td ></td>
        </tr>
    </thead>`;
}

function carregaPromos(responsePromo) {
    $.each(responsePromo, function () {
        table +=
            `<tr>
            <td data-id="${this['id']}" class="dados">${this['tipo']}</td>
            <td class="dados">${this['preco']} </td>
            <td>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                </svg>
            </td>
        </tr>`;
    });

    document.getElementById('tbl-promo').innerHTML = table;

}

// utilizar somente numeros

function somenteNumeros(e) {
    var tecla = e.which || e.keyCode;

    if ((tecla >= 48 && tecla <= 57) || tecla == 8) {
        return true;
    } else {
        return false;
    }
}

//Categoria_produto,Porcentagem,Id_categoria,Id_produto

function criaDropProd(data) {
    const selecionaProduto = document.getElementById('Id_produto');
    data.forEach((item) => {
        const opcao = document.createElement('option');
        opcao.value = item.id;
        opcao.text = item.tipo;
        selecionaProduto.appendChild(opcao);
    });
}

//puxando tabela de categorias do banco
dados2();


async function dados2() {
    try {
        const response = await axios.get('http://10.0.3.77:3000/SelecionaCategoria');
        console.log(response.data);
        criaDrop(response.data);
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

function criaDrop(data) {
    const selecionaElemento = document.getElementById('Id_produto');
    data.forEach((item) => {
        const opcao = document.createElement('option');
        opcao.value = item.id;
        opcao.text = item.tipo;
        selecionaElemento.appendChild(opcao);
    });
}




// async function dados2() {
//     try {
//         const response = await axios.get('http://10.0.3.77:3000/SelecionaProduto');
//         console.log(response.data);
//         criaDrop(response.data);
//     } catch (error) {
//         console.error('Erro ao buscar dados da API:', error);
//     }
// }

// function criaDrop(data) {
//     const selecionaElemento = document.getElementById('Id_produto');
//     data.forEach((item) => {
//         const opcao = document.createElement('option');
//         opcao.value = item.id;
//         opcao.text = item.nome_produto;
//         selecionaElemento.appendChild(opcao);
//     });
// }

function createDropdown(id, name, labelText, options) {
    // Cria o elemento label
    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.className = 'dropdown-button';
    label.textContent = labelText;

    // Cria o elemento select
    const select = document.createElement('select');
    select.className = 'form-control form-control-sm';
    select.id = id;
    select.name = name;

    // Adiciona a opção vazia
    const emptyOption = document.createElement('option');
    emptyOption.value = '';
    emptyOption.textContent = '';
    select.appendChild(emptyOption);

    // Adiciona as opções fornecidas
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.text;
        select.appendChild(opt);
    });

    // Adiciona o label e o select ao container
    const container = document.getElementById('dropdownContainer');
    container.appendChild(label);
    container.appendChild(select);
}

// Exemplo de uso da função
const options = [
    { value: 'categoria1', text: 'Categoria 1' },
    { value: 'categoria2', text: 'Categoria 2' },
    { value: 'categoria3', text: 'Categoria 3' }
];

createDropdown('Id_categoria', 'Id_categoria', 'Categoria: *', options);