// trazer o header

fetch('./html/partials/headerUser.html')
    .then(response => response.text())
    .then(html => {
        const header = document.createElement('header');
        header.innerHTML = html;
        document.body.appendChild(header);
    });

    const modal = document.getElementById('modal');
    const btnAbrirModal = document.getElementById('btn-abrir-modal');
    
    // Inicializa o modal como fechado
    modal.hidden = true;
    modal.style.display = 'none';
    
    function modalAbrir() {
      modal.hidden = false;
      modal.style.display = 'block';
      modal.setAttribute('open', ''); // Adiciona o atributo open para exibir o modal
    }
    
    function modalFechar() {
      modal.hidden = true;
      modal.style.display = 'none';
      modal.removeAttribute('open'); // Remove o atributo open para ocultar o modal
    }
    
    btnAbrirModal.addEventListener('click', modalAbrir);
    
    // Adicione um evento de clique ao botão de fechar
    document.querySelector('.close').addEventListener('click', modalFechar);