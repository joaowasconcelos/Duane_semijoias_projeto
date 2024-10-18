document.addEventListener("DOMContentLoaded", function () {
  var btn = document.querySelector('[data-bs-toggle="offcanvas"]');
  btn.addEventListener("click", function () {
    var offcanvasScrolling = new bootstrap.Offcanvas('#offcanvasScrolling');
    offcanvasScrolling.show();
  });
});


async function dados() {
  try {
    // Fazendo a requisição com axios.get
    const response = await axios.get('http://10.0.3.77:3000/SelecionaProduto');
    console.log(response);
    console.log(response.data);

    const itens = $("#cardGrid");
    response.data.forEach(element => {

      console.log(element);

      const newCard = (` 
            <div class="card h-100">
                              <img src="../img/imgTest.jpeg" class="card-img-top" alt="...">
                              <div class="card-body">
                                  <p class="text-title">${element.nome_produto}</p>
                                  <a href="/web/publico/html/cardItem.html/${id}">Ver mais</a>
                                  <p class="text-body">${element.descricao}</p>
                              </div>
                              <div class="card-footer">
                                  <span class="text-title">${element.preco}</span>
                                  <div class="card-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/></svg>
                                  </div>
                                  <div class="card-button">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16"><path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/></svg> 
                                  </div>
                              </div>
                          </div>
            `)

      itens.append(newCard);
    });

    //carregar dados para o front com jquery

  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
  }
}

dados();