// Carrega o carrinho do localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log(cart);


function loadOrderSummary() {
  const orderItems = document.getElementById('order-items');
  const orderTotalElement = document.getElementById('order-total');
  orderItems.innerHTML = '';

  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    console.log(li);
    
    li.textContent = `${item.nome_produto} - Quantidade: ${item.quantity} - R$ ${item.preco_normal}`;
    orderItems.appendChild(li);
    total += item.preco_normal * item.quantity;
  });

  orderTotalElement.textContent = total.toFixed(2);
}

function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('nome_produto').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('endereco').value;
  const paymentMethod = document.getElementById('payment-method').value;

  const orderDetails = {
    customer: { name, email, address },
    paymentMethod,
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  };

  //chamada da API para enviar o pedido
  fetch( axios.get('http://10.0.3.77:3000/Pedido'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderDetails)
  })
  .then(response => response.json())
  .then(data => {
    showNotification('Compra realizada com sucesso!');
    console.log('Resposta do servidor:', data);
    // Limpa o carrinho e redireciona para uma página de sucesso
    localStorage.removeItem('cart');
    window.location.href = 'compra-sucesso.html';
  })
  .catch(error => {
    console.error('Erro ao finalizar a compra:', error);
    showNotification('Ocorreu um erro ao finalizar a compra. Tente novamente.');
  });
}

// Carrega o resumo do pedido ao carregar a página
document.addEventListener('DOMContentLoaded', loadOrderSummary);

// Lida com a submissão do formulário de checkout
document.getElementById('checkout-form').addEventListener('submit', handleFormSubmit);
