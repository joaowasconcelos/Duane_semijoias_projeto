document.addEventListener("DOMContentLoaded", function () {
    const btn = document.querySelector('[data-bs-toggle="offcanvas"]');
    if (btn) {
        btn.addEventListener("click", function () {
            const offcanvasElement = document.getElementById('offcanvasScrolling');
            const offcanvasInstance = new bootstrap.Offcanvas(offcanvasElement);
            offcanvasInstance.show();
        });
    } else {
        console.warn("Botão do offcanvas não encontrado.");
    }
  
    let products = [];
    apiIp()
    function apiIp() {
        const ip = `http://10.0.3.77:3000/`
        localStorage.setItem('ip', ip);
      }
  
    async function fetchProducts() {
        try {
            const response = await axios.get(`${localStorage.getItem("ip")}SelecionaProduto`);
            products = response.data;
            displayProducts(products);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    }
  
    function displayProducts(products) {
        const productList = document.getElementById('cardGrid');
        productList.innerHTML = '';
  
        products.forEach(product => {
            const card = newCard(product);
            productList.innerHTML += card;
        });
    }
  
    function newCard(element) {
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
                    <span class="text-title">R$ ${element.preco_normal}</span>
                    <div class="card-button">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            fill="currentColor" 
                            class="bi bi-cart" 
                            viewBox="0 0 16 16"
                            onclick="addToCart({ id: ${element.id}, nome_produto: '${element.nome_produto}', preco_normal: ${element.preco_normal.replace(',', '.')} })"
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
  
    // Controle de índice para exibir as imagens
    const imageIndices = {};
  
    // Funções para exibir imagens anteriores e próximas
    window.showPrevImage = function (productId) {
        const product = products.find(item => item.id === productId);
        if (product) {
            if (!imageIndices[productId]) imageIndices[productId] = 0;
            imageIndices[productId] = (imageIndices[productId] - 1 + product.imagens.length) % product.imagens.length;
            document.getElementById(productImage-{productId}).src = product.imagens[imageIndices[productId]];
        }
    };
  
    window.showNextImage = function (productId) {
        const product = products.find(item => item.id === productId);
        if (product) {
            if (!imageIndices[productId]) imageIndices[productId] = 0;
            imageIndices[productId] = (imageIndices[productId] + 1) % product.imagens.length;
            document.getElementById(productImage-{productId}).src = product.imagens[imageIndices[productId]];
        }
    };
  
    fetchProducts();
  });
