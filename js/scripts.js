// Declarando variaveis pelo id

// openModalButton = #open-modal
const openModalButton = document.querySelector("#open-modal");

// closeModalButton = #close-modal
const closeModalButton = document.querySelector("#close-modal");

// modal
const modal = document.querySelector("#modal");

// background do modal
const fade = document.querySelector("#fade");

// Função para alternar classe "hide" do Modal atraves do classList
const toggleModal = () => {
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
};

// Array para Evento "click" e utilizando forEach para percorrer array
[openModalButton, closeModalButton, fade].forEach((elemento) => {
  elemento.addEventListener("click", () => toggleModal());
});
