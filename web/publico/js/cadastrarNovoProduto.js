//dinheiro

// const mascaraMoeda = (event) => {
//     const onlyDigits = event.target.value
//         .split("")
//         .filter(s => /\d/.test(s))
//         .join("")
//         .padStart(3, "0")
//     const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
//     event.target.value = maskCurrency(digitsFloat)
// }

// const maskCurrency = (valor, locale = 'pt-BR', currency = 'BRL') => {
//     return new Intl.NumberFormat(locale, {
//         style: 'currency',
//         currency
//     }).format(valor)
// }

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