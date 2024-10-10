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
        
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

dados();