// trazer o header

fetch('./html/partials/headerUser.html')
    .then(response => response.text())
    .then(html => {
        const header = document.createElement('header');
        header.innerHTML = html;
        document.body.appendChild(header);
    });
