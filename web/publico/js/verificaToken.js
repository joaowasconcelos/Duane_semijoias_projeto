function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function isTokenExpired() {
    const tokenString = localStorage.getItem('token');
    if (!tokenString) {
        window.location.href = '/publico/html/login.html'; 
    }

    const token = parseJwt(tokenString);
    const currentTime = Math.floor(Date.now() / 1000); // Tempo atual em segundos
    return currentTime >= token.exp; // Retorna true se o token expirou
}

function checkTokenPeriodically() {
    const tokenString = localStorage.getItem('token');
    if (!tokenString) {
        showNotification("Faça o login para acessar");
        window.location.href = '/publico/html/login.html'; 
    }
    const interval = setInterval(() => {
        if (isTokenExpired()) {
            clearInterval(interval);
            showNotification("Sua sessão expirou. Redirecionando para a página de login.");
            window.location.href = '/publico/html/login.html'; 
        }
    }, 60000); // Verifica a cada 1 minuto
}

checkTokenPeriodically();
