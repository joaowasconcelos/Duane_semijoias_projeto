async function SelecionaInfo() {
  const token = localStorage.getItem('token');
  try {
    const resposta = await axios.get('http://10.0.3.77:3000/SelecionaInfoUsers', {
      headers: {
        'x-access-token': `${token}`
      }
    });
    console.log(resposta)
    console.log(resposta.data)

    const userInfo = resposta.data[0];
    document.querySelector('input[name="Nome"]').value = userInfo.nome
    document.querySelector('input[name="email"]').value = userInfo.usuario;
    document.querySelector('input[name="cpf"]').value = userInfo.cpf;
    document.querySelector('input[name="datNasc"]').value = userInfo.data_nasc;
    document.querySelector('input[name="tel"]').value = userInfo.numeros;


  } catch (error) {
    console.error('Erro ao verificar o token:', error);
    // window.location.href = 'login.html';
  }
}
SelecionaInfo()

async function AlterarSenha() {
  const token = localStorage.getItem('token');
  const senhaAtual = document.getElementById('senhaAtual').value;
  const novaSenha = document.getElementById('novaSenha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;

  // Verifica se as senhas coincidem
  if (novaSenha !== confirmarSenha) {
    alert("A nova senha e a confirmação não coincidem.");
    return;
  }

  try {
    const resposta = await axios.put('http://10.0.3.77:3000/AlterarSenha', {
      senhaAtual,
      novaSenha
    }, {
      headers: {
        'x-access-token': `${token}`
      }
    });

    console.log(resposta.data)
    if (resposta.data.message === "Senha alterada com sucesso!") {
      alert("Senha alterada com sucesso!");
      document.getElementById('modal').close();
    } else {
      alert("Erro ao alterar a senha: " + resposta.data.message);
    }

  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        alert("Senha atual incorreta.");
      } else if (error.response.status === 500) {
        alert("Erro no servidor. Tente novamente mais tarde.");
      } 
    }
  }
}



const modal = document.getElementById('modal');
const btnAbrirModal = document.getElementById('btn-abrir-modal');

// Inicializa o modal como fechado
modal.hidden = true;
modal.style.display = 'none';

function modalAbrir() {
  modal.hidden = false;
  modal.style.display = 'block';
  modal.setAttribute('open', ''); // Adiciona o atributo open para exibir o modal
}

function modalFechar() {
  modal.hidden = true;
  modal.style.display = 'none';
  modal.removeAttribute('open'); // Remove o atributo open para ocultar o modal
}

btnAbrirModal.addEventListener('click', modalAbrir);

// Adicione um evento de clique ao botão de fechar
document.querySelector('.close').addEventListener('click', modalFechar);