// Carrega o carrinho do localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];


function loadOrderSummary() {
  const orderItems = document.getElementById('order-items');
  const orderTotalElement = document.getElementById('order-total');
  console.log(orderTotalElement)
  orderItems.innerHTML = '';

  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.className = 'order-item';
    li.textContent = `${item.nome_produto} - Quantidade: ${item.quantity} - R$ ${(item.preco_normal).toFixed(2)}`;
    orderItems.appendChild(li);
    total += Number(item.preco_normal) * Number(item.quantity);
  });

  orderTotalElement.textContent = total.toFixed(2);
}

document.addEventListener('DOMContentLoaded', loadOrderSummary);


// function loadOrderSummary() {
//   const orderItems = document.getElementById('order-items');
//   const orderTotalElement = document.getElementById('order-total');
//   orderItems.innerHTML = '';

//   let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.className = 'order-item';
    li.textContent = `${item.nome_produto} - Quantidade: ${item.quantity} - R$ ${(item.preco_normal).toFixed(2)}`;
    orderItems.appendChild(li);
    total += Number(item.preco_normal) * Number(item.quantity);
  });

//   orderTotalElement.textContent = `R$ ${total.toFixed(2)}`;
// }

// document.addEventListener('DOMContentLoaded', loadOrderSummary);


