fetch('./html/partials/headerAdm.html')
    .then(response => response.text())
    .then(html => {
        const header = document.createElement('header');
        header.innerHTML = html;
        document.body.appendChild(header);
    })
    .catch(error => console.error('Erro ao carregar o cabeçalho:', error));

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})
