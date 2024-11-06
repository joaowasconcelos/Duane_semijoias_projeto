function checkUserProfile() {
    const userProfile = localStorage.getItem('userProfile');
    if (!userProfile) {
        showNotification('Você não está autenticado! Redirecionando para a página de login.');
        window.location.href = '/web/publico/html/login.html';
        return;
    }

    const profileData = JSON.parse(userProfile);
    if (profileData.perfil != 1) {
        showNotification('Você não tem permissão para acessar esta página.');
        window.location.href = '/web/publico/html/login.html'; 
    }

}
checkUserProfile()


