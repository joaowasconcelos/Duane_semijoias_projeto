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
        window.location.href = 'login.html';
    }
    const token = parseJwt(tokenString);
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime >= token.exp;
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log(localStorage.getItem('token') && isTokenValid(localStorage.getItem('token')))
    if (localStorage.getItem('token') && isTokenValid(localStorage.getItem('token'))) {
        const interval = setInterval(() => {
            if (isTokenExpired()) {
                clearInterval(interval)
                window.location.href = 'login.html';
                alert("Sessão inspirada");
            }
        }, 1); // Verifica a cada 1 minuto
    } else {
        console.log("Invalid token or no token found. Redirecting to login.");
        window.location.href = 'login.html';
        alert("Sessão inspirada ");
    }
});

function isTokenValid(token) {
    if (!token) return false;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiration = payload.exp;
    const now = Math.floor(Date.now() / 1000);
    return expiration > now;
}


