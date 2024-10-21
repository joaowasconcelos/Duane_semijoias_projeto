// Carrega o carrinho do localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function loadOrderSummary() {
  const orderItems = document.getElementById('order-items');
  const orderTotalElement = document.getElementById('order-total');
  orderItems.innerHTML = '';

  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - Quantidade: ${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`;
    orderItems.appendChild(li);
    total += item.price * item.quantity;
  });

  orderTotalElement.textContent = total.toFixed(2);
}

function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;
  const paymentMethod = document.getElementById('payment-method').value;

  const orderDetails = {
    customer: { name, email, address },
    paymentMethod,
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  };

  // Simula a chamada da API para enviar o pedido
  fetch('https://sua-api.com/comprar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderDetails)
  })
  .then(response => response.json())
  .then(data => {
    alert('Compra realizada com sucesso!');
    console.log('Resposta do servidor:', data);
    // Limpa o carrinho e redireciona para uma página de sucesso
    localStorage.removeItem('cart');
    window.location.href = 'compra-sucesso.html';
  })
  .catch(error => {
    console.error('Erro ao finalizar a compra:', error);
    alert('Ocorreu um erro ao finalizar a compra. Tente novamente.');
  });
}

// Carrega o resumo do pedido ao carregar a página
document.addEventListener('DOMContentLoaded', loadOrderSummary);

// Lida com a submissão do formulário de checkout
document.getElementById('checkout-form').addEventListener('submit', handleFormSubmit);
