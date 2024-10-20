// trazer o header

// fetch('../html/partials/headerUser.html')
//     .then(response => response.text())
//     .then(html => {
//         const header = document.getElementById('header');
//         header.innerHTML = html;
//         document.body.appendChild(header);
//     });

async function authenticateJWT() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }
  try {
    const resposta = await axios.get('http://192.168.3.9:3000/verificar-token', {
      headers: {
        'x-access-token': `${token}`
      }
    });
    console.log(resposta)
    console.log(resposta.data.message)
    if (!resposta.data.message === "Token válido.") {
      window.location.href = 'login.html';
    }

  } catch (error) {
    console.error('Erro ao verificar o token:', error);
    window.location.href = 'login.html';
  }
}
authenticateJWT()
SelecionaInfo()

async function SelecionaInfo() {
  const token = localStorage.getItem('token');
  try {
    const resposta = await axios.get('http://192.168.3.9:3000/SelecionaInfoUsers', {
      headers: {
        'x-access-token': `${token}`
      }
    });
    console.log(resposta)
    console.log(resposta.data)

  } catch (error) {
    console.error('Erro ao verificar o token:', error);
    window.location.href = 'login.html';
  }
}

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
    const resposta = await axios.put('http://192.168.3.9:3000/AlterarSenha', {
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