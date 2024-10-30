// cart.js

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Atualiza a exibição do carrinho
function updateCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Limpa a lista atual

    // Atualiza a lista de produtos no carrinho
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nome_produto} - R$ ${item.preco_normal.toFixed(2)} - Quantidade: `;

        // Input para quantidade
        const input = document.createElement('input');
        input.type = 'number';
        input.value = item.quantity;
        input.min = 1;
        input.onchange = (e) => updateQuantity(item.id, e.target.value);
        li.appendChild(input);

        // Botão para remover o item
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeFromCart(item.id);
        li.appendChild(removeButton);

        cartList.appendChild(li);
    });

    // Atualiza o total
    const total = cart.reduce((sum, item) => sum + (item.preco_normal || 0) * item.quantity, 0);
    document.getElementById('total').textContent = total.toFixed(2);

    // Salva o carrinho no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Adiciona produto ao carrinho
function addToCart(product) {
    const cartItem = cart.find(item => item.id === product.id);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

// Atualiza a quantidade de um produto no carrinho
function updateQuantity(productId, newQuantity) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem && newQuantity > 0) {
        cartItem.quantity = parseInt(newQuantity);
        updateCart();
    }
}

// Remove um produto do carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Chama esta função para exibir o carrinho ao abrir o offcanvas
function openCart() {
    updateCart();
}