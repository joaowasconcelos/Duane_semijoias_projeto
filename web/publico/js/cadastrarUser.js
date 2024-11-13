function limparInput() {
    document.getElementById('Nome').value = '';
    document.getElementById('CPF').value = '';
    document.getElementById('Usuario').value = '';
    document.getElementById('Data_Nasc').value = '';
    document.getElementById('Genero').value = '';
    document.getElementById('Telefones').value = '';
    window.location.reload(true);
}

//mascara para numero de telefone

const telefoneInput = document.getElementById('Telefones');

telefoneInput.addEventListener('input', () => {
    let valor = telefoneInput.value;

    // Remover caracteres não numéricos
    valor = valor.replace(/\D/g, '');

    // Adicionar máscara
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');

    telefoneInput.value = valor;
});

Array.from(telefoneInputs2).forEach(telefone => {
    telefone.addEventListener('input', () => {
        let valor = telefone.value;
        valor = valor.replace(/\D/g, '');
        valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
        valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
        telefone.value = valor;
    });
});


//mascara CPF

var corCompleta = "#99ff8f"
var corIncompleta = "#eff70b"

function coresMask(t) {
    var l = t.value;
    var m = l.length;
    var x = t.maxLength;
    if (m == 0) {
        t.style.borderColor = "";
        t.style.backgroundColor = "";
    }
    else if (m < x) {
        t.style.borderColor = corIncompleta;
        t.style.backgroundColor = corIncompleta;
    } else {
        t.style.borderColor = corCompleta;
        t.style.backgroundColor = corCompleta;
    }
}

function mascara(m, t, e, c) {
    var cursor = t.selectionStart;
    var texto = t.value;
    texto = texto.replace(/\D/g, '');
    var l = texto.length;
    var lm = m.length;
    if (window.event) {
        id = e.keyCode;
    } else if (e.which) {
        id = e.which;
    }
    cursorfixo = false;
    if (cursor < l) cursorfixo = true;
    var livre = false;
    if (id == 16 || id == 19 || (id >= 33 && id <= 40)) livre = true;
    ii = 0;
    mm = 0;
    if (!livre) {
        if (id != 8) {
            t.value = "";
            j = 0;
            for (i = 0; i < lm; i++) {
                if (m.substr(i, 1) == "#") {
                    t.value += texto.substr(j, 1);
                    j++;
                } else if (m.substr(i, 1) != "#") {
                    t.value += m.substr(i, 1);
                }
                if (id != 8 && !cursorfixo) cursor++;
                if ((j) == l + 1) break;

            }
        }
        if (c) coresMask(t);
    }
    if (cursorfixo && !livre) cursor--;
    t.setSelectionRange(cursor, cursor);
}

// Função para extrair apenas os números
function obterApenasNumerosCPF() {
    const input = document.getElementById('CPF');
    const apenasNumerosCPF = input.value.replace(/\D/g, ''); // Remove tudo que não for número
    console.log(apenasNumerosCPF); // Mostra apenas os números no console
    return apenasNumerosCPF; // Retorna os números do CPF
}
function obterApenasNumerosTel() {
    const telefoneIds = ['Telefones', 'Telefones2']; // Array com os IDs dos campos de telefone
    const apenasNumerosArray = telefoneIds.map(id => {
        const input = document.getElementById(id);
        return input ? input.value.replace(/\D/g, '') : ''; // Remove tudo que não for número
    });

    console.log(apenasNumerosArray); // Mostra os números de cada telefone como array no console
    return apenasNumerosArray; // Retorna o array com os números de telefone
}




// Funçao para não permitir caracteres especiais ao preencher o Nome
const nomeInput = document.querySelector("#Nome");

nomeInput.addEventListener("keypress", function (e) {

    if (!checandoCaracter(e)) {
        e.preventDefault();
    }
});

function checandoCaracter(e) {
    const pattern = /^[a-zA-Z\s]+$/;
    return pattern.test(e.key);
}

//Funçao para validar Usuario

function validando() {
    const form = document.getElementById("form");
    const Usuario = document.getElementById("Usuario").value;
    const text = document.getElementById("text");
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (Usuario.match(pattern)) {
        form.classList.toggle("valid", true);
        form.classList.toggle("invalid", false);
        text.innerHTML = "";
    } else if (Usuario === "") {
        form.classList.remove("valid", "invalid");
        text.innerHTML = "";
    } else {
        form.classList.toggle("valid", false);
        form.classList.toggle("invalid", true);
        text.innerHTML = "Por favor, insira um email válido.";
        text.style.color = "#ff0000";
        text.style.fontFamily = "sans-serif";
        text.style.fontWeight = "bold";
        text.style.fontSize = "11px";
    }
}


//função para enviar formulário

async function salvar() {
    const Nome = document.getElementById("Nome").value;
    const Usuario = document.getElementById("Usuario").value;
    const CPF = obterApenasNumerosCPF();
    const Genero = document.getElementById("Genero").value;
    const Data_Nasc = document.getElementById("Data_Nasc").value;
    const Telefones = obterApenasNumerosTel();
    const Senha = document.getElementById("Senha").value;

    try {
        await axios.post(`${localStorage.getItem("ip")}CreateUser`,
            {
                Nome: Nome,
                Usuario: Usuario,
                CPF: CPF,
                Genero: Genero,
                Data_Nasc: Data_Nasc,
                Telefones: Telefones,
                Senha: Senha
            }).then(response =>{
                console.log(response)
                showNotification('Cadastro realizado com sucesso!');
            }).catch(error =>{
                console.log(error)
            })
           

    } catch (error) {
        console.error('Erro ao cadastrar novo Usuario:', error);
        showNotification("Ocorreu um erro ao cadastrar novo Usuario. Tente novamente.");
    }

    //window.location.reload(true);
}