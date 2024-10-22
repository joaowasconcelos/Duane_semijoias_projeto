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

// const telefoneInput2 = document.getElementsByClassName('Telefone2');

// telefoneInput2.addEventListener('input', () => {
//     let valor2 = telefoneInput2.value;

//     // Remover caracteres não numéricos
//     valor2 = valor2.replace(/\D/g, '');

//     // Adicionar máscara
//     valor2 = valor2.replace(/^(\d{2})(\d)/g, '($1) $2');
//     valor2 = valor2.replace(/(\d)(\d{4})$/, '$1-$2');

//     telefoneInput2.value = valor2;
// });

//mascara CPF

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

// Funçao para não permitir caracteres especiais ao preencher o Nome

const nomeInput = document.querySelector("#Nome");

nomeInput.addEventListener("keypress", function (e) {

    if (!checandoCaracter(e)) {
        e.preventDefault();
    }
});

function checandoCaracter(e) {
    const caracter = String.fromCharCode(e.keyCode);

    const pattern = '[a-z A-Z]';

    if (caracter.match(pattern)) {
        return true;
    }
}

//Funçao para validar Usuario

function validando() {
    var form = document.getElementById("form");
    var Usuario = document.getElementById("Usuario").value;
    var text = document.getElementById("text");
    var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (Usuario.match(pattern)) {
        form.classList.add("valid");
        form.classList.remove("invalid");
        text.innerHTML = "";
        text.style.color = "#00ff00";
    }
    else {
        form.classList.remove("valid");
        form.classList.add("invalid");
        text.innerHTML = "Por favor, insira um email valido."
        text.style.color = "#ff0000";
        text.style.fontFamily = "sans-serif";
        text.style.fontWeight = "bold";
        text.style.fontSize = "11px";
    }

    if (Usuario == "") {
        form.classList.remove("valid");
        form.classList.remove("invalid");
        text.innerHTML = "";
        text.style.color = "#00ff00";
    }
}

//função para enviar formulário

async function salvar() {
    const token = localStorage.getItem('token');
    const Nome = document.getElementById("Nome").value;
    const Usuario = document.getElementById("Usuario").value;
    const CPF = document.getElementById("CPF").value;
    const Genero = document.getElementById("Genero").value;
    const Data_Nasc = document.getElementById("Data_Nasc").value;
    const Telefones = document.getElementById("Telefones").value;
    //const perfil = document.getElementById("perfil").value

    try {
        const response = await axios.post('http://10.0.3.77:3000/CreateADM', 
        {
            Nome: Nome,
            Usuario: Usuario,
            CPF: CPF,
            Genero: Genero,
            Data_Nasc: Data_Nasc,
            Telefones: Telefones,
            //perfil: perfil
        }, 
        {
            headers: {
                'x-access-token': token
            }
        });
        console.log(response.data);

    } catch (error) {
        console.error('Erro ao cadastrar novo ADM:', error);
        alert("Ocorreu um erro ao cadastrar novo ADM. Tente novamente.");
    }

    // limparInput();
    //window.location.reload(true);
}