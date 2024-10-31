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

        //puxando categorias
        await axios.get(
            'http://10.0.3.77:3000/SelecionaCategoria',
            {
                headers: {
                    'x-access-token': token
                }
            }).then(response => {
                responseTipo = response.data
                if (responseTipo != null || responseTipo != undefined) {
                    console.log(responseTipo)
                }
            }).catch(error => {
                console.log(error);
            });

        //puxando categorias
        await axios.get(
            'http://10.0.3.77:3000/SelecionaProduto',
            {
                headers: {
                    'x-access-token': token
                }
            }).then(response => {
                responseProd = response.data
                if (responseProd != null || responseProd != undefined) {
                    console.log(responseProd)
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

