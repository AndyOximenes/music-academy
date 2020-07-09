// === ACTIVE MENU ===

const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header .links a");

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active");
    }
}

// MEMBER | INSTRUCTOR DELETE

const formDelete = document.querySelector("#form-delete");
formDelete.addEventListener("submit", (e) => {
    const confirmation = confirm("Deseja realmente deletar?");
    if (!confirmation) {
        e.preventDefault();
    }
});
