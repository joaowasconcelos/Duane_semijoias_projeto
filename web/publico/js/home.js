document.addEventListener("DOMContentLoaded", function () {
    let currentPage = 1; // Página inicial
    const rowsPerPage = 8; // Quantidade de linhas por página
    let totalRows = 0;
    let filteredProducts = [];
    let products = [];
    let cart = localStorage.getItem('cart');

    // Configuração inicial da API e URL
    const ip = "http://10.0.3.77:3000/";
    localStorage.setItem('ip', ip);

    // Carrega os produtos inicialmente ao carregar a página
    async function fetchProducts() {
        try {
            const response = await axios.get(`${localStorage.getItem("ip")}SelecionaProduto`);
            products = response.data; // Armazena todos os produtos no array 'products'
            filteredProducts = products; // Inicialmente, 'filteredProducts' é igual a todos os produtos
            totalRows = filteredProducts.length; // Total de produtos (filtrados inicialmente)
            renderProducts(); // Renderiza os produtos na página
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    }

    // Função para renderizar produtos de acordo com a paginação
    function renderProducts() {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const paginatedData = filteredProducts.slice(startIndex, endIndex);

        const productList = document.getElementById('cardGrid');
        productList.innerHTML = ''; // Limpa a lista de produtos exibida

        paginatedData.forEach(product => {
            const card = newCard(product);
            productList.innerHTML += card;
        });

        const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
        $("#pageInfo").text(`Página ${currentPage} de ${totalPages}`);

        // Habilita ou desabilita os botões de navegação
        $("#prevPage").prop('disabled', currentPage === 1);
        $("#nextPage").prop('disabled', currentPage === totalPages);
    }

    // Adicionando o evento para garantir que a tela preta desapareça ao fechar
    document.getElementById('offcanvasScrolling').addEventListener('hidden.bs.offcanvas', function () {
        const overlay = document.querySelector('.offcanvas-backdrop');
        if (overlay) {
            overlay.remove(); // Remove o overlay
            document.body.style.overflow = '';
        }
    });

    // Função para gerar o HTML de cada cartão de produto
    function newCard(element) {
        return `
            <div class="card h-100">
                <div class="card-img-top">
                    <img src="${element.imagens[0]}" alt="Imagem do produto" class="product-image" id="productImage-${element.id}" />
                    <button onclick="showPrevImage(${element.id})"><svg id="icon" class="icons" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                      </svg></a></button>
                    <button onclick="showNextImage(${element.id})"><svg id="icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
</svg></button>
                </div>
                <div class="card-body">
                    <p class="text-title">${element.nome_produto || 'Produto sem nome'}</p>
                    <a href="/publico/html/cardItem.html/${element.id || '#'}">Ver mais</a>
                </div>
                <div class="card-footer">
                    <span class="text-title">R$ ${element.preco_normal}</span>
                    <div class="card-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16"
                            onclick="addToCart({id: ${element.id}, img: '${element.imagens[0]}', nome_produto: '${element.nome_produto}', preco_normal: '${element.preco_normal.replace(',', '.')}'});"
                            style="cursor: pointer;">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg>
                    </div>
                    <div class="card-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16"
                            onclick="addToFavorites(${element.id || 0})"
                            style="cursor: pointer;">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                        </svg>
                    </div>
                </div>
            </div>`;
    }

    document.getElementById('procurar').addEventListener('input', function () {
        const nomeParaFiltrar = this.value.toLowerCase();
        Filter(nomeParaFiltrar);
    });

    async function Filter(nomeParaFiltrar) {
        try {
            filteredProducts = products.filter(item => item.nome_produto.toLowerCase().includes(nomeParaFiltrar));
            totalRows = filteredProducts.length; 
            currentPage = 1; 
            renderProducts(); 

            if (filteredProducts.length === 0) {
                document.getElementById('cardGrid').innerHTML = '<p>Nenhum produto encontrado.</p>';
                $("#pageInfo").text('');
                $("#prevPage").prop('disabled', true);
                $("#nextPage").prop('disabled', true);
            }
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    }

    const imageIndices = [];
    window.showPrevImage = function (productId) {
        const product = products.find(item => item.id === productId);
        if (product) {
            const images = Array.isArray(product.imagens) ? product.imagens : [];
            if (images.length > 0) {
                if (!imageIndices[productId]) imageIndices[productId] = 0;
                imageIndices[productId] = (imageIndices[productId] - 1 + images.length) % images.length;
                document.getElementById(`productImage-${productId}`).src = images[imageIndices[productId]];
            } else {
                console.error('Produto sem imagens ou imagens não válidas:', product);
            }
        }
    };
    
    window.showNextImage = function (productId) {
        const product = products.find(item => item.id === productId);
        if (product) {
            const images = Array.isArray(product.imagens) ? product.imagens : [];
            if (images.length > 0) {
                if (!imageIndices[productId]) imageIndices[productId] = 0;
                imageIndices[productId] = (imageIndices[productId] + 1) % images.length;
                document.getElementById(`productImage-${productId}`).src = images[imageIndices[productId]];
            } else {
                console.error('Produto sem imagens ou imagens não válidas:', product);
            }
        }
    };
    
    

    // Controle de navegação de página
    $("#prevPage").click(function () {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
        }
    });

    $("#nextPage").click(function () {
        if (currentPage < Math.ceil(totalRows / rowsPerPage)) {
            currentPage++;
            renderProducts();
        }
    });
    fetchProducts();
});

function verificarLogin(event) {
    const token = localStorage.getItem('token');
    if (!token) {
        event.preventDefault();
        localStorage.setItem('urlDestino', window.location.href = "carrinho.html");
        window.location.href = "login.html";
    } else {
        window.location.href = "carrinho.html";
    }
}