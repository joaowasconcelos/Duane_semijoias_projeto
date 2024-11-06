// Acesse a URL atual
const urlParams = new URLSearchParams(window.location.search);

// Recupere o valor do parâmetro 'token'
const token = urlParams.get('token');
console.log("Opa",token)
// Verifique se o token foi encontrado
if (token) {
    console.log("Token recebido:", token);
    // Aqui você pode usar o token para enviar ao backend
} else {
    console.log("Token não encontrado na URL.");
}

async function RedefinirSenha() {
    console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
    const senha = document.getElementById("senha").value;
    const confirmSenha = document.getElementById("confirmSenha").value;

    if (senha !== confirmSenha) {
        showNotification("As senhas precisam ser iguais");
        return;
    }

    try {
        // Certifique-se de que o token seja enviado para o backend
        const response = await axios.post(`${localStorage.getItem("ip")}/PrimeiroAcesso`, {
            senha,
            token  // Enviando o token na requisição
        });

        if (response.status === 200) {
            showNotification("Senha redefinida com sucesso!");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 3000);
        }
    } catch (error) {
        console.error('Erro ao redefinir senha:', error);
    }
}
