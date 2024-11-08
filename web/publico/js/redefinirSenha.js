

// Acesse a URL atual
const urlParams = new URLSearchParams(window.location.search);

// Recupere o valor do parâmetro 'token'
const token = urlParams.get('token');
console.log("Opa", token)
// Verifique se o token foi encontrado
if (token) {
    console.log("Token recebido:", token);
    // Aqui você pode usar o token para enviar ao backend
} else {
    console.log("Token não encontrado na URL.");
}


async function RedefinirSenha() {
    const login = document.getElementById("login").value
    const senha = document.getElementById("senha").value;
    const confirmSenha = document.getElementById("confirmSenha").value;
    if (senha !== confirmSenha) {
        showNotification("As senhas precisam ser iguais");
        return;
    }
    console.log("OPLS")
    try {
        console.log("entrou no try")
        // Certifique-se de que o token seja enviado para o backend
        await axios.post(
            `http://10.0.3.94:3000/PrimeiroAcesso`, {
            login: login,
            senha: senha

        },
            {
                headers: {
                    'x-access-token': token,
                }
            }
        ).then(response => {
            console.log(response)
            if (response.status === 200) {
                showNotification("Senha redefinida com sucesso!");
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 3000);
            }
        }).catch(error => {
            showNotification("Erro ao redefinir senha, confira seus campos");
            console.log(error)
        })
    } catch (error) {
        console.log("Uia")
        showNotification("Erro ao definir uma nova senha");
        console.error('Erro ao redefinir senha:', error.message || error);
    }
}
