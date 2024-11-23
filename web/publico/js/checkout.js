// Carrega o carrinho do localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Função para atualizar o carrinho no localStorage
function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
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
        <img src="${item.img}" alt="Imagem do produto" class="product-image" id="productImage-${item.id}" />
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

    console.log(item);
    

    // Controle de índice para exibir as imagens
    const imageIndices = {};

    // Funções para exibir imagens anteriores e próximas - no escopo global
    window.showPrevImage = function (productId) {
      const product = products.find(item => item.id === productId);
      if (product) {
        if (!imageIndices[productId]) imageIndices[productId] = 0;
        imageIndices[productId] = (imageIndices[productId] - 1 + product.img.length) % product.img.length;
        document.getElementById(`productImage-${productId}`).src = product.img[imageIndices[productId]];
      }
    };

    window.showNextImage = function (productId) {
      const product = products.find(item => item.id === productId);
      if (product) {
        if (!imageIndices[productId]) imageIndices[productId] = 0;
        imageIndices[productId] = (imageIndices[productId] + 1) % product.img.length;
        document.getElementById(`productImage-${productId}`).src = product.img[imageIndices[productId]];
      }
    };

    orderItems.appendChild(li);
    total += Number(item.preco_normal) * Number(item.quantity);
  });

  orderTotalElement.textContent = total.toFixed(2);
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
    // Remover o item do carrinho se a quantidade for 0
    cart.splice(index, 1);
  }
  updateCart();
  loadOrderSummary();
}

// Carregar o resumo do pedido ao carregar a página
document.addEventListener('DOMContentLoaded', loadOrderSummary);


/* ////////////////////////////////       /////////////////////////////*/ 

// document.getElementById("checkout-btn").addEventListener("click", function () {
//   $('#checkout-btn').attr("disabled", true);

//   const orderData = {
//     quantity: document.getElementById("quantity").value,
//     description: document.getElementById("product-description").innerHTML,
//     price: document.getElementById("unit-price").innerHTML
//   };

//   fetch("http://localhost:8080/create_preference", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(orderData),
//   })
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (preference) {
//       if (preference.id) {
//         createCheckoutButton(preference.id);

//         $(".shopping-cart").fadeOut(500);
//         setTimeout(() => {
//           $(".container_payment").show(500).fadeIn();
//         }, 500);
//       } else {
//         alert("Erro ao criar a preferência de pagamento.");
//         $('#checkout-btn').attr("disabled", false);
//       }
//     })
//     .catch(function (error) {
//       console.error("Erro inesperado:", error);
//       alert("Erro inesperado ao criar o pagamento.");
//       $('#checkout-btn').attr("disabled", false);
//     });
// });

// function createCheckoutButton(preferenceId) {
//   // Inicializa o checkout
//   const bricksBuilder = mercadopago.bricks();

//   const renderComponent = async (bricksBuilder) => {
//     if (window.checkoutButton) window.checkoutButton.unmount(); // Desmonta o botão anterior se já existir
//     await bricksBuilder.create(
//       'wallet',
//       'button-checkout', // Classe ou ID onde o botão será exibido
//       {
//         initialization: {
//           preferenceId: preferenceId
//         },
//         callbacks: {
//           onError: (error) => console.error(error),
//           onReady: () => {}
//         }
//       }
//     );
//   };

//   window.checkoutButton = renderComponent(bricksBuilder);
// }
