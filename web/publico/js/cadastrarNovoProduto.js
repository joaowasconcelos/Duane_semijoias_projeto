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

$('#produto-form').on('submit', async function (event) {
    event.preventDefault()
    const token = localStorage.getItem('token');
    const formData = new FormData(this);
    console.log(formData)
    console.log(localStorage.getItem("ip"))
    console.log(token)
    try {
        await axios.post(`${localStorage.getItem("ip")}CreateProduto`, formData, {
            headers: {
                'x-access-token': token,
            }
        }).then(response => {
            console.log(response)
            showNotification(response.data.message)
            setTimeout(() => {
                window.location.reload(true)
            }, 3000);
            return
        }).catch(error => {
            console.log(error)
        });

    } catch (error) {
        console.error('Erro ao criar o produto:', error);
        showNotification("Ocorreu um erro ao criar o produto. Tente novamente.");
    }
})

//puxando tabela de categorias do banco

async function dados() {
    try {
        const response = await axios.get(`${localStorage.getItem("ip")}SelecionaCategoria`);
        console.log(response.data);
        criaDrop(response.data);
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

function criaDrop(data) {
    const selecionaElemento = document.getElementById('categoria');
    data.forEach((item) => {
        const opcao = document.createElement('option');
        opcao.value = item.id;
        opcao.text = item.tipo;
        selecionaElemento.appendChild(opcao);
    });
}

dados();

//selecionar no maximo 5 imagens
const fileInput = document.getElementById('imagem');
const errorMessage = document.getElementById('errorMessage');

fileInput.addEventListener('change', () => {
    const fileCount = fileInput.files.length;

    // Verifica se não há arquivos ou se há mais de 5 arquivos
    if (fileCount === 0 || fileCount > 5) {
        errorMessage.style.display = 'block';
        fileInput.value = ''; // Limpa os arquivos selecionados
    } else {
        errorMessage.style.display = 'none';
    }
});
