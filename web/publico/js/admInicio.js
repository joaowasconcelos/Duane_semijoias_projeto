// trazer o header

fetch('./html/partials/headerAdm.html')
    .then(response => response.text())
    .then(html => {
        const header = document.createElement('header');
        header.innerHTML = html;
        document.body.appendChild(header);
    });


// trazer o footer

// fetch('./html/partials/footer.html')
//     .then(response => response.text())
//     .then(html => {
//         const header = document.createElement('footer');
//         header.innerHTML = html;
//         document.body.appendChild(header);
//     });

    