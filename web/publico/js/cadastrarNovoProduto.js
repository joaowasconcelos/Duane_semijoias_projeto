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
    document.getElementById('produto').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('imagem').value = '';
    window.location.reload(true);
}

//salvar formulario
async function salvar() {
    const token = localStorage.getItem('token');
    const preco = document.getElementById("preco").value;
    const produto = document.getElementById("produto").value;
    const descricao = document.getElementById("descricao").value;
    const categoria = document.getElementById("categoria").value;
    const imagem = document.getElementById("imagem").value;

    try {
        const response = await axios.post('http://10.0.3.77:3000/CreateProduto', 
        {
            preco: preco,
            produto: produto,
            descricao: descricao,
            categoria: categoria,
            imagem: imagem
        }, 
        {
            headers: {
                'x-access-token': token
            }
        });
        console.log(response.data);

        //const responseImg = await axios.post('http://192.168.3.9:3000/postagens/${}')
        
        
        // if (response.status === 200) {
        //     alert("Produto criado com sucesso!");
        // } else {
        //     alert("Erro ao criar o produto.");
        // }

    } catch (error) {
        console.error('Erro ao criar o produto:', error);
        alert("Ocorreu um erro ao criar o produto. Tente novamente.");
    }

    // limparInput();
    // window.location.reload(true);
}

//puxando tabela de categorias do banco

async function dados() {
    try {
        // Fazendo a requisição com axios.get
        const response = await axios.get('http://10.0.3.77:3000/SelecionaCategoria');
        console.log(response.data)
        criaDrop(response.data)

    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}


//adicionando categorias ao dropdown 

function criaDrop(data) {
    const selecionaElemento = document.getElementById('categoria');
    data.forEach((item) => {
        //console.log(item)
        const opcao = document.createElement('option');
        opcao.value = item.id;
        opcao.text = item.tipo;
        selecionaElemento.appendChild(opcao);
    })
}

dados();