function changeSubtitle() {
    document.getElementById('subtitleCadastradas').textContent = 'Qual o novo nome da categoria?';
    document.getElementById('titleCadastradas2').textContent = 'Edite a categoria escolhida';
}

function salvar(){
    window.location.reload(true);
}