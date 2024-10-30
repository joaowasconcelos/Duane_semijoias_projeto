document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector('[data-bs-toggle="offcanvas"]');
  btn.addEventListener("click", function () {
      const offcanvasElement = document.getElementById('offcanvasScrolling');
      const offcanvasInstance = new bootstrap.Offcanvas(offcanvasElement);
      offcanvasInstance.show();
      openCart(); // Chama a função para atualizar o carrinho ao abrir
  });

  // Carrega produtos ao iniciar a página
  async function fetchProducts() {
      try {
          const response = await axios.get('http://10.0.3.77:3000/SelecionaProduto');
          const products = response.data;
          displayProducts(products);
      } catch (error) {
          console.error('Erro ao buscar produtos:', error);
      }
  }

  function displayProducts(products) {
      const productList = document.getElementById('cardGrid');
      productList.innerHTML = '';

      products.forEach(product => {
          const card = newCard(product); // Chama a função que gera o card
          productList.innerHTML += card; // Adiciona o card ao grid
      });
  }

  function newCard(element) {
      const precoNormal = typeof element.preco_normal === 'number' ? element.preco_normal : 0;

      return `
          <div class="card h-100">
              <div class="card-img-top">
                  <img src="${element.imagens[0] || '../img/imgTest.jpeg'}" alt="Imagem do produto" class="product-image" id="productImage-${element.id}" />
                  <button onclick="showPrevImage(${element.id})">Anterior</button>
                  <button onclick="showNextImage(${element.id})">Próximo</button>
              </div>
              <div class="card-body">
                  <p class="text-title">${element.nome_produto || 'Produto sem nome'}</p>
                  <a href="/web/publico/html/cardItem.html/${element.id || '#'}">Ver mais</a>
              </div>
              <div class="card-footer">
                  <span class="text-title">R$ ${precoNormal.toFixed(2)}</span>
                  <div class="card-button">
                      <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          fill="currentColor" 
                          class="bi bi-cart" 
                          viewBox="0 0 16 16"
                          onclick="addToCart({ id: ${element.id}, nome_produto: '${element.nome_produto}', preco_normal: ${precoNormal} })"
                          style="cursor: pointer;"
                      >
                          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                      </svg>
                  </div>
                  <div class="card-button">
                      <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          fill="currentColor" 
                          class="bi bi-heart" 
                          viewBox="0 0 16 16"
                          onclick="addToFavorites(${element.id || 0})"
                          style="cursor: pointer;"
                      >
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                      </svg>
                  </div>
              </div>
          </div>`;
  }

  fetchProducts(); // Inicia a busca de produtos
});
<<<<<<< HEAD
=======


async function dados() {
  try {
    // Fazendo a requisição com axios.get
    const response = await axios.get('http://10.0.3.77:3000/SelecionaProduto');
    // const imagem = await axios.get('http://10.0.3.77:3000/Postagem');
    // console.log(imagem);
    
    console.log(response);
    console.log(response.data);

    const itens = $("#cardGrid");
    response.data.forEach(element => {

      const newCard = () => (`
        <div class="card h-100">
          <img src="../img/imgTest.jpeg" class="card-img-top" alt="...">
          <div class="card-body">
            <p class="text-title">${element.nome_produto || 'Produto sem nome'}</p>
            <a href="/web/publico/html/cardItem.html/${element.id || '#'}">Ver mais</a>
          </div>
          <div class="card-footer">
            <span class="text-title">R$ ${element.preco_normal || '0.00'}</span>
            <div class="card-button">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                fill="currentColor" 
                class="bi bi-cart" 
                viewBox="0 0 16 16"
                onclick="addToCart(${element.id || 0})"
                style="cursor: pointer;"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
              </svg>
            </div>
            <div class="card-button">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                fill="currentColor" 
                class="bi bi-heart" 
                viewBox="0 0 16 16"
                onclick="toggleFavorite(${element.id || 0})"
                style="cursor: pointer;"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
              </svg>
            </div>
          </div>
        </div>
      `);
      
      
      itens.append(newCard);
    });

    //carregar dados para o front com jquery

  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
  }
}

dados();

//carrinho de compras

// URL da API que retorna a lista de produtos
const apiUrl = 'http://10.0.3.77:3000/SelecionaProduto'; // API

// Inicializa o carrinho
let cart = JSON.parse(localStorage.getItem('cart')) || [];

async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  }
}

function displayProducts(products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = ''; // Limpa a lista antes de adicionar novos produtos

  products.forEach(product => {
    const li = document.createElement('li');
    li.textContent = `${product.name} - R$ ${product.price}`;
    const button = document.createElement('button');
    button.textContent = 'Adicionar ao carrinho';
    button.onclick = () => addToCart(product);
    li.appendChild(button);
    productList.appendChild(li);
  });
}

function addToCart(product) {
  const cartItem = cart.find(item => item.id === product.id);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
  openCartModal();
}

function openCartModal() {
  const modal = document.getElementById('cart-modal');
  modal.style.display = 'flex';
  updateCart();
}

function closeCartModal() {
  const modal = document.getElementById('cart-modal');
  modal.style.display = 'none';
}

function updateCart() {
  const cartList = document.getElementById('cart-list');
  cartList.innerHTML = ''; // Limpa o carrinho atual

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - R$ ${item.price} - Quantidade: `;
    
    // Input para editar a quantidade
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
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById('total').textContent = total.toFixed(2);

  // Salva o carrinho no localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateQuantity(productId, newQuantity) {
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem && newQuantity > 0) {
    cartItem.quantity = parseInt(newQuantity);
    updateCart();
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

// function finalizePurchase() {
//   if (cart.length > 0) {
//     // Simulando envio do pedido para a API
//     fetch('https://sua-api.com/comprar', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(cart)
//     })
//     .then(response => response.json())
//     .then(data => {
//       alert('Compra finalizada com sucesso!');
//       cart = [];
//       updateCart();
//       closeCartModal();
//       localStorage.removeItem('cart');
//     })
//     .catch(error => {
//       console.error('Erro ao finalizar a compra:', error);
//     });
//   } else {
//     alert('O carrinho está vazio!');
//   }
// }

// Carrega os produtos e o carrinho na inicialização
fetchProducts();
updateCart();
>>>>>>> c9d1e41a6d8702276c62dfb70ead2d83f7dc71ce
