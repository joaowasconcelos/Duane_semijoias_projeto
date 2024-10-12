function changeSubtitle() {
    document.getElementById('subtitleCadastradas').textContent = 'Qual o novo nome da categoria?';
    document.getElementById('titleCadastradas2').textContent = 'Edite a categoria escolhida';
}

function salvar() {
    window.location.reload(true);
}

//puxando tabela de categorias do banco

async function dados() {
    try {
        // Fazendo a requisição com axios.get
        const responsePed = await axios.get('http://10.0.3.77:3000/SelecionaPedido');
        const responseTipo = await axios.get('http://10.0.3.77:3000/SelecionaCategoria');
        console.log(responsePed.data)
        console.log(responseTipo.data)

    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

dados();

// function catDrop(data) {
//     const selecionaElemento = document.getElementById('categorias');

//     data.forEach((item) => {
        
//         const tipoCat = document.createElement('th');
//         tipoCat.className = 'categoria';
//         tipoCat.id = `categoria-${item.id}`;
//         tipoCat.text = item.tipo;

//         const editar = document.createElement('td');
//         editar.innerHTML = `<span id="iconTable" class="fas fa-edit" data-toggle="modal" data-target="#meuModal" onclick="changeSubtitle(${item.id})"></span>`;

//         const excluir = document.createElement('td');
//         excluir.innerHTML = `<span id="iconTable" class="fas fa-trash" onclick="excluirCategoria(${item.id})"></span>`;

//         row.appendChild(tipoCat);
//         row.appendChild(editar);
//         row.appendChild(excluir);

//         selecionaElemento.appendChild(row);
//     });
// }

// function catDrop(data) {
//     // Seleciona o tbody da tabela onde as categorias serão inseridas
//     const selecionaElemento = document.querySelector('#categorias tbody'); 

//     // Limpa o conteúdo anterior da tabela, caso esteja atualizando
//     selecionaElemento.innerHTML = '';

//     data.forEach((item) => {
//         // Cria uma nova linha para a tabela
//         const row = document.createElement('tr'); 

//         // Cria a célula da categoria
//         const tipoCat = document.createElement('th');
//         tipoCat.className = 'categoria';
//         tipoCat.id = `categoria-${item.id};` // Define o ID da categoria
//         tipoCat.textContent = item.tipo; // Define o tipo da categoria como texto

//         // Cria a célula para editar
//         const editar = document.createElement('td');
//         editar.innerHTML = `<span id="iconTable" class="fas fa-edit" data-toggle="modal" data-target="#meuModal" onclick="changeSubtitle(${item.id})"></span>;`

//         // Cria a célula para excluir
//         const excluir = document.createElement('td');
//         excluir.innerHTML = `<span id="iconTable" class="fas fa-trash" onclick="excluirCategoria(${item.id})"></span>;`

//         // Adiciona as células à linha
//         row.appendChild(tipoCat);
//         row.appendChild(editar);
//         row.appendChild(excluir);

//         // Adiciona a linha ao tbody da tabela
//         selecionaElemento.appendChild(row);
//     });
// }

tipoCategorias = function () {
    var $linhas = $("#categorias > tr");
    $linhas.each( function() {
        var cat = $(".categoria", this). html();
        console.log($(".categoria", this).html());

        myJS
    })
}