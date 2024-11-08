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
      <span class="product-name">${item.nome_produto}</span>
      <div class="price">
        <span class="currency">R$</span><span class="item-price">${(item.preco_normal).toFixed(2)}</span>
      </div>
      <div class="quantity-control">
        <button onclick="decreaseQuantity(${index})">-</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQuantity(${index})">+</button>
      </div>
    `;

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
