// Adiciona a estrutura de notificação ao corpo do documento
$(document).ready(function() {
    $('body').append(`
        <div id="notification" class="hidden">
            <p id="notificationText">Mensagem de notificação</p>
            <button id="closeNotification">Fechar</button>
        </div>
    `);

    // Evento para fechar a notificação manualmente
    $('#closeNotification').on('click', function() {
        $('#notification').addClass('hidden');
    });
});

// Função para exibir a notificação personalizada
function showNotification(message, duration = 3000) {
    const notification = $('#notification');
    const notificationText = $('#notificationText');
    
    // Define a mensagem e exibe a notificação
    notificationText.text(message);
    notification.removeClass('hidden');
    
    // Oculta a notificação após o tempo especificado
    setTimeout(() => {
        notification.addClass('hidden');
    }, duration);
}
