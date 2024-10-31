async function dados() {
    try {
        const token = localStorage.getItem('token');
        await axios.get(
            `${localStorage.getItem("ip")}selecionaCupons`,
            {
                headers: {
                    'x-access-token': token
                }
            }).then(response => {
                responseCupom = response.data
                console.log(responseCupom)
                if (responseCupom != null || responseCupom != undefined) {
                    criarTabela();
                    carregaCupons(responseCupom);
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
            <td class="tituloTd">Código</td>
            <td class="tituloTd">Status</td>
            <td></td>
        </tr>
    </thead>`;
}

function carregaCupons(responseCupom) {
    $.each(responseCupom, function () {
        table +=
            `<tr>
            <td data-id="${this['id']}" class="dados">${this['codigo']}</td>
            <td class="dados">${this['status']}</td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                </svg>
            </td>
        </tr>`;
    });



    document.getElementById('tbl-cupons').innerHTML = table;

}

