function limparInput() {
    const campos = ['Nome', 'CPF', 'Usuario', 'Data_Nasc', 'Genero', 'Telefones', 'Telefones2'];
    campos.forEach(campo => {
        document.getElementById(campo).value = '';
    });
    // Em vez de recarregar a página, você pode querer fazer alguma atualização dinâmica aqui.
}

// Função para aplicar a máscara de telefone
function aplicarMascaraTelefone(input) {
    input.addEventListener('input', () => {
        let valor = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2'); // Adiciona a máscara de DDD
        valor = valor.replace(/(\d)(\d{4})$/, '$1-$2'); // Adiciona o hífen
        input.value = valor;
    });
}

// Aplicar a máscara a todos os inputs de telefone
const telefoneInputs = ['Telefones', 'Telefones2'];
telefoneInputs.forEach(id => {
    const telefoneInput = document.getElementById(id);
    if (telefoneInput) {
        aplicarMascaraTelefone(telefoneInput);
    }
});

// Função para extrair apenas os números do CPF
function obterApenasNumerosCPF() {
    const input = document.getElementById('CPF');
    const apenasNumerosCPF = input.value.replace(/\D/g, ''); // Remove tudo que não for número
    console.log(apenasNumerosCPF); // Mostra apenas os números no console
    return apenasNumerosCPF; // Retorna os números do CPF
}

// Função para extrair apenas os números dos telefones
function obterApenasNumerosTel() {
    const telefoneIds = ['Telefones', 'Telefones2']; // Array com os IDs dos campos de telefone
    const apenasNumerosArray = telefoneIds.map(id => {
        const input = document.getElementById(id);
        return input ? input.value.replace(/\D/g, '') : ''; // Remove tudo que não for número
    });

    console.log(apenasNumerosArray); // Mostra os números de cada telefone como array no console
    return apenasNumerosArray; // Retorna o array com os números de telefone
}

// Função para mascarar CPF
function mascara(m, t, e, c) {
    var cursor = t.selectionStart;
    var texto = t.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    var l = texto.length;
    var lm = m.length;
    var id = (window.event) ? e.keyCode : e.which;
    var cursorfixo = cursor < l;

    var livre = (id == 16 || id == 19 || (id >= 33 && id <= 40));
    var j = 0;

    if (!livre && id !== 8) {
        t.value = "";
        for (var i = 0; i < lm; i++) {
            if (m.charAt(i) === "#") {
                t.value += texto.charAt(j++);
            } else if (m.charAt(i) !== "#") {
                t.value += m.charAt(i);
            }
            if (!cursorfixo) cursor++;
            if (j === l + 1) break;
        }
    }

    if (cursorfixo && !livre) cursor--;
    t.setSelectionRange(cursor, cursor);
}

// Função para não permitir caracteres especiais ao preencher o Nome
const nomeInput = document.querySelector("#Nome");
nomeInput.addEventListener("keypress", function (e) {
    if (!checandoCaracter(e)) {
        e.preventDefault();
    }
});

function checandoCaracter(e) {
    const caracter = String.fromCharCode(e.keyCode);
    const pattern = '[a-z A-Z]';
    return caracter.match(pattern);
}

// Função para validar o usuário (email)
function validando() {
    const form = document.getElementById("form");
    const usuario = document.getElementById("Usuario").value;
    const text = document.getElementById("text");
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (usuario.match(pattern)) {
        form.classList.add("valid");
        form.classList.remove("invalid");
        text.innerHTML = "";
        text.style.color = "#00ff00";
    } else {
        form.classList.remove("valid");
        form.classList.add("invalid");
        text.innerHTML = "Por favor, insira um email válido.";
        text.style.color = "#ff0000";
        text.style.fontFamily = "sans-serif";
        text.style.fontWeight = "bold";
        text.style.fontSize = "11px";
    }

    if (usuario === "") {
        form.classList.remove("valid");
        form.classList.remove("invalid");
        text.innerHTML = "";
    }
}

// Função para enviar o formulário
async function salvar() {
    const token = localStorage.getItem('token');
    const Nome = document.getElementById("Nome").value;
    const Usuario = document.getElementById("Usuario").value;
    const CPF = obterApenasNumerosCPF();
    const Genero = document.getElementById("Genero").value;
    const Data_Nasc = document.getElementById("Data_Nasc").value;
    const Telefones = obterApenasNumerosTel();
    const perfil = document.getElementById("perfil").value;

    try {
        await axios.post('http://192.168.3.9:3000/CreateADM',
            {
                Nome,
                Usuario,
                CPF,
                Genero,
                Data_Nasc,
                Telefones, // Agora um array com os números
                perfil
            },
            {
                headers: {
                    'x-access-token': token
                }
            }).then(response => {
                showNotification(response.data.message);
                limparInput()
            }).catch(error => {
                console.log(error)
                if (error.response.data.message === "Erro CPF ja cadastrado")
                    showNotification(error.response.data.message)

                if (error.response.data.message === "Erro Usuario ja cadastrado")
                    showNotification(error.response.data.message)
            })


    } catch (error) {
        console.error('Erro ao cadastrar novo ADM:', error);
        showNotification("Ocorreu um erro ao cadastrar novo ADM. Tente novamente.");
    }

    // Em vez de recarregar a página, você pode querer fazer alguma atualização dinâmica aqui.
}
