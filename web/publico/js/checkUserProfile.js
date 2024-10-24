function checkUserProfile() {
    const userProfile = localStorage.getItem('userProfile');

    if (!userProfile) {
        alert('Você não está autenticado! Redirecionando para a página de login.');
        window.location.href = 'login.html';
        return;
    }

    const profileData = JSON.parse(userProfile);

    if (profileData.perfil === 1) {
    } else if (profileData.perfil === 2) {
    } else {
        console.log('Perfil não autorizado!');
        alert('Você não tem permissão para acessar esta página.');
        //window.location.href = 'erro.html'; 
    }
}
checkUserProfile()
