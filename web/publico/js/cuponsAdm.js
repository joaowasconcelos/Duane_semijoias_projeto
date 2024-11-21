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
                //console.log(responseCupom)
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
            <td>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onclick="dadosModal('${this['id']}')">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                </svg>
            </td>
            <td>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16" onclick="deletaCupom('${this['id']}')">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                </svg>
            </td>
        </tr>`;
    });

    document.getElementById('tbl-cupons').innerHTML = table;

}

//dinheiro

const mascaraMoeda = (event) => {
    const valor = event.target.value.replace(",", ".");
    const onlyDigits = valor
        .split("")
        .filter(s => /\d/.test(s))
        .join("")
        .padStart(3, "0")
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
    event.target.value = maskCurrency(digitsFloat)
}

const maskCurrency = (valor, locale = 'pt-BR', currency = 'BRL') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
    }).format(valor)
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

//limpar input 

function limparInput() {
    document.getElementById('Codigo').value = '';
    document.getElementById('Descricao').value = '';
    document.getElementById('Valor').value = '';
    document.getElementById('Quantidade').value = '';
}

//cadastrar cupom

async function salvar(event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const Codigo = document.getElementById("Codigo").value;
    const Descricao = document.getElementById("Descricao").value;
    const Valor = document.getElementById("Valor").value;
    const Quantidade = document.getElementById("Quantidade").value;


    console.log(Codigo, Descricao, Valor, Quantidade)

    try {
        const response = await axios.post(
            `${localStorage.getItem("ip")}CreateCupom`,
            {
                Codigo: Codigo,
                Descricao: Descricao,
                Valor: Valor,
                Quantidade: Quantidade
            },
            {
                headers: {
                    'x-access-token': token
                }
            }
        ).then(response => {
            console.log(response)
            limparInput()
            showNotification(response.data.message)
            setTimeout(() => {
                window.location.reload(true);
            }, 2000)          
        }).catch(error =>{
            console.log(error)
        })

    } catch (error) {
        console.error('Erro ao cadastrar novo cupom:', error);
        showNotification("Ocorreu um erro ao cadastrar novo cupom. Tente novamente.");
    }
}

//carregando dados no modal

async function dadosModal(id) {

    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(`${localStorage.getItem("ip")}selecionaCupons/${id}`, {
            headers: {
                'x-access-token': token
            }
        });

        console.log(response.data);

        const item = response.data[0];

        const codigo_cupom = item.codigo;

        console.log(codigo_cupom)

        document.getElementById("id").value = item.id;
        document.getElementById("codigo").value = codigo_cupom;
        document.getElementById("descricao").value = item.descricao;
        document.getElementById("quantidade").value = item.quantidade;
        document.getElementById("valor").value = item.valor;
        document.getElementById("status").value = item.status;

    } catch (error) {
        console.error('Erro ao buscar cupom:', error);
        showNotification("Ocorreu um erro ao buscar os detalhes do cupom. Tente novamente.");
    }
}

//salvar alterações do cupom

async function saveModal() {


    const token = localStorage.getItem('token');
    let id = document.getElementById("id").value;

    const Codigo = document.getElementById("codigo").value;
    const Descricao = document.getElementById("descricao").value;
    const Valor = document.getElementById("valor").value;
    const Quantidade = document.getElementById("quantidade").value;

    try {
        await axios.put(`${localStorage.getItem("ip")}ModificaCupom/${id}`,
            {
                Descricao: Descricao,
                Codigo: Codigo,
                Valor: Valor,
                Quantidade: Quantidade,
                Status: "1"
            },
            {
                headers: {
                    'x-access-token': token
                }
            }).then(response => {
                showNotification(response.data.message);
                setTimeout(() => {
                    window.location.reload(true);
                }, 4000)
            }).catch(error => {
                showNotification(error.response.data.error)
            })
    } catch (error) {
        console.error('Erro ao atualizar cupom:', error);
        showNotification("Ocorreu um erro ao editar cupom. Tente novamente.");
    }

}

//excluir cupom 

async function deletaCupom(id) {

    console.log("chegou")
    const token = localStorage.getItem('token');

    try {
        await axios.put(`${localStorage.getItem("ip")}DeletaCupom/${id}`,
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
        console.error('Erro ao excluir cupom:', error);
        showNotification("Ocorreu um erro ao excluir cupom. Tente novamente.");
    }
}