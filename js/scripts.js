// Criação de variaveis de interaçÃo do modal atraves do id
// Open Modal
const openModalButton = document.querySelector("#open-modal")
// Close Modal
const closeModalButton = document.querySelector("#close-modal")
// Modal
const modal = document.querySelector("#modal")
// Background do Modal
const fade = document.querySelector("#fade")

// Função de alternar "hide" ou não do modal e fade
const toggleModal = () => {
    modal.classList.toggle("hide")
    fade.classList.toggle("hide")
}

// aoClicar no botão execute a função toggleModal
[openModalButton, closeModalButton, fade].forEach(elemento => {
    elemento.addEventListener("click", () => toggleModal())
});