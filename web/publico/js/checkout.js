// Carrega o carrinho do localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Função para atualizar o carrinho no localStorage
function updateCart() {
  localStorage.removeItem('cart');
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.reload()
}

// Função para carregar o resumo do pedido
function loadOrderSummary() {
  const orderItems = document.getElementById('order-items');
  const orderTotalElement = document.getElementById('order-total');
  orderItems.innerHTML = '';

  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'order-item';

    // Criar o conteúdo com nome, preço e quantidade com botões de ajuste
    li.innerHTML = `
    <div id="cart-list">
        <img src="${item.img}" alt="Imagem do produto" class="product-image" id="productImage-${item.id}" style="width: 100px"/>
        <span class="product-name">${item.nome_produto}</span>
        <div class="price">
          <span class="currency">R$</span><span class="item-price">${(item.preco_normal)}</span>
        </div>
        <div class="quantity-control">
          <button onclick="decreaseQuantity(${index})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQuantity(${index})">+</button>
        </div>
     </div>
    `;


    // // Controle de índice para exibir as imagens
    // const imageIndices = {};

    // // Funções para exibir imagens anteriores e próximas - no escopo global
    // window.showPrevImage = function (productId) {
    //   const product = products.find(item => item.id === productId);
    //   if (product) {
    //     if (!imageIndices[productId]) imageIndices[productId] = 0;
    //     imageIndices[productId] = (imageIndices[productId] - 1 + product.img.length) % product.img.length;
    //     document.getElementById(`productImage-${productId}`).src = product.img[imageIndices[productId]];
    //   }
    // };

    // window.showNextImage = function (productId) {
    //   const product = products.find(item => item.id === productId);
    //   if (product) {
    //     if (!imageIndices[productId]) imageIndices[productId] = 0;
    //     imageIndices[productId] = (imageIndices[productId] + 1) % product.img.length;
    //     document.getElementById(`productImage-${productId}`).src = product.img[imageIndices[productId]];
    //   }
    // };

    orderItems.appendChild(li);
    total += Number(item.preco_normal) * Number(item.quantity);
  });

  orderTotalElement.textContent = total.toFixed(2);
  selectsEndereços()
  selectCupons()
}

// Função para aumentar a quantidade
function increaseQuantity(index) {
  cart[index].quantity++;
  updateCart();
  loadOrderSummary();
}

// Função para diminuir a quantidade
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  updateCart();
  loadOrderSummary();
}


$("#endereco").submit(function (event) {
  event.preventDefault();
  const cep = $("#cep").val();
  const rua = $("#rua").val();
  const bairro = $("#bairro").val();
  const cidade = $("#cidade").val();
  const uf = $("#uf").val();
  const numero = $("#numero").val()
  const token = localStorage.getItem('token');

  axios.post(`${localStorage.getItem("ip")}CreateEndereco`, {
    cep: cep,
    logradouro: rua,
    bairro: bairro,
    cidade: cidade,
    uf: uf,
    numero: numero
  }, {
    headers: {
      'x-access-token': token
    }
  })
    .then(response => {
      console.log("Endereço cadastrado com sucesso:", response.data);
      alert("Endereço cadastrado com sucesso!");
      limpa_formulário_cep()
    })
    .catch(error => {
      console.log("Erro ao cadastrar endereço:", error);
      alert("Erro ao cadastrar endereço. Tente novamente!");
    });

})

function InvalidaCupom() {
  localStorage.removeItem('totalComDesconto')
  window.location.reload()
}

async function aplicaCupom(cupom) {
  const totalComDesconto = localStorage.getItem('totalComDesconto');
  if (totalComDesconto) {
    showNotification("Cupom já aplicado!");
    const buttonAplica = document.getElementById("aplica");
    buttonAplica.disabled = true;  
    return; 
  }

  if (cupom) {
    const valorDesconto = cupom.valor;
    const orderTotalElement = document.getElementById('order-total');
    
    const totalAtual = parseFloat(orderTotalElement.textContent);
    console.log("totalAtual", totalAtual);
    const novoTotal = totalAtual - valorDesconto;
    console.log("novoTotal", novoTotal);
    
 
    orderTotalElement.textContent = novoTotal.toFixed(2);
    localStorage.setItem('totalComDesconto', novoTotal);

    // Desabilita o botão para evitar que o cupom seja aplicado novamente
    const buttonAplica = document.getElementById("aplica");
    buttonAplica.disabled = true;

    // Limpa o campo de input do cupom (supondo que o ID do campo de input seja "cupom-input")
    const cupomInput = document.getElementById("cupom-input");
    if (cupomInput) {
      cupomInput.value = '';  // Limpa o campo de input
    }
  }
}

async function selectCupons() {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${localStorage.getItem("ip")}selecionaCupons`, {
      headers: {
        'x-access-token': token
      }
    });
    const cupons = response.data;
    return cupons;  
  } catch (error) {
    console.error("Erro ao buscar cupons:", error);
  }
}

async function VerificaCupom() {
  const cupons = document.getElementById("cupom").value;
  const CupomDigitado = cupons.toUpperCase()
  const CupomCadastrados = await selectCupons();  
  const cupomValido = CupomCadastrados.find(cupom => cupom.codigo === CupomDigitado);

  if (cupomValido) {
    console.log("Cupom Válido");
    showNotification("Cupom Aplicado");
   aplicaCupom(cupomValido)
  } else {
    console.log("Cupom Inválido");
    showNotification("Cupom Inválido");
    return
  }
}

function selectsEndereços() {
  const token = localStorage.getItem('token');
  try {
    axios.get(`${localStorage.getItem("ip")}MeuEnde`, {
      headers: {
        'x-access-token': token
      }
    })
      .then(response => {
        const enderecos = response.data.endereco[0];
        const enderecosContainer = document.getElementById('enderecos');
        enderecosContainer.innerHTML = '';

        if (enderecos.length > 0) {
          enderecos.forEach(endereco => {
            const enderecoDiv = document.createElement('div');
            enderecoDiv.classList.add('endereco');

            // Verifica se o endereço é o selecionado
            const isChecked = endereco.id === enderecoSelecionadoId ? 'checked' : '';

            // Cria os elementos de exibição
            enderecoDiv.innerHTML = `
              <input type="radio" name="endereco" onclick="selecionarEndereco(${endereco.id})" ${isChecked}>
              <p><strong>CEP:</strong> ${endereco.cep}</p>
              <p><strong>Cidade:</strong> ${endereco.cidade}</p>
              <p><strong>Logradouro:</strong> ${endereco.logradouro}</p>
              <p><strong>Número:</strong> ${endereco.numero_endereco}</p>
              <p><strong>Estado:</strong> ${endereco.estado}</p>
              <p><strong>Complemento:</strong> ${endereco.complemento || 'Não informado'}</p>
              <hr>
            `;

            // Adiciona o endereço à lista
            enderecosContainer.appendChild(enderecoDiv);
          });
        } else {
          enderecosContainer.innerHTML = '<p>Nenhum endereço encontrado.</p>';
        }
      })
  } catch (error) {
    console.log(error)
  }
}


let enderecoSelecionadoId = null;

// Função para selecionar o endereço
function selecionarEndereco(id) {
  if (enderecoSelecionadoId === id) {
    enderecoSelecionadoId = null;
    console.log("Endereço desmarcado:", id);
  } else {
    enderecoSelecionadoId = id;
    console.log("Endereço selecionado:", id);
  }
  selectsEndereços();
}

function obterEnderecoSelecionado() {
  return enderecoSelecionadoId;
}

function mostrarFormulario() {
  document.getElementById("endereco").style.display = "block";
  const campos = document.querySelectorAll("#endereco input, #endereco button");
  campos.forEach(campo => {
    campo.disabled = false;
  });
  document.querySelector("button").disabled = true;
  document.getElementById("ocultarBtn").style.display = "inline-block";
}

function ocultarFormulario() {
  document.getElementById("endereco").style.display = "none";
  const campos = document.querySelectorAll("#endereco input, #endereco button");
  campos.forEach(campo => {
    campo.disabled = true;
  });
  document.querySelector("button").disabled = false;
  document.getElementById("ocultarBtn").style.display = "none";
}

// Carregar o resumo do pedido ao carregar a página
document.addEventListener('DOMContentLoaded', loadOrderSummary);
