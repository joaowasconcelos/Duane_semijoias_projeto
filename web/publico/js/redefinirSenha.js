async function RedefinirSenha() {
    const login = document.getElementById("login").value
    const senha = document.getElementById("senha").value
    const comfirmSenha = document.getElementById("confirmSenha").value

    if(senha != comfirmSenha){
        showNotification("As senhas precisam ser iguais ")  
        return
    }

    try {
        await axios.post('http://10.0.3.77:3000/PrimeiroAcesso',
            {
                login,
                senha
            }
        ).then(response => {
            console.log(response)
            if(response.status ===200){
                showNotification("Senha definida com sucesso!")
                setTimeout(() => {
                    window.location.href = "login.html"
                }, 3000);
                return 
            }
        }).catch(error => {
            console.log(error)
           if(error.response.data.message === "Usuario Inválido"){
            showNotification("Usuário Inválido")
           }
        })
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}