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

async function salvar() {
    const token = localStorage.getItem('token');

    const formData = new FormData();  // Collecting form data
    formData.append('produto', document.getElementById("nome_produto").value);
    formData.append('descricao', document.getElementById("descricao").value);
    formData.append('categoria', document.getElementById("tipo").value); // 'categoria' select has id "tipo"
    formData.append('preco', document.getElementById("preco").value);
    formData.append('imagem', document.getElementById("imagem").files[0]);  // File input
    console.log(formData)

    try {
        const response = await axios.post('http://10.0.3.77:3000/CreateProduto', formData, {
            headers: {
                'x-access-token': token,
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response);
        alert("Produto criado com sucesso!");
    } catch (error) {
        console.error('Erro ao criar o produto:', error);
        alert("Ocorreu um erro ao criar o produto. Tente novamente.");
    }
}



//puxando tabela de categorias do banco

async function dados() {
    try {
        const response = await axios.get('http://10.0.3.77:3000/SelecionaCategoria');
        console.log(response.data);
        criaDrop(response.data);
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

function criaDrop(data) {
    const selecionaElemento = document.getElementById('tipo');
    data.forEach((item) => {
        const opcao = document.createElement('option');
        opcao.value = item.id;
        opcao.text = item.tipo;  // Ensure 'tipo' is the correct property for the category name
        selecionaElemento.appendChild(opcao);
    });
}

dados();
