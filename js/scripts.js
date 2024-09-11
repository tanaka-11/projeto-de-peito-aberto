// Criação de variaveis de interaçÃo do modal atraves do id
// Open Modal
const openModalButton = document.querySelector("#open-modal");
// Close Modal
const closeModalButton = document.querySelector("#close-modal");
// Modal
const modal = document.querySelector("#modal");
// Background do Modal
const fade = document.querySelector("#fade");

// Função de alternar "hide" ou não do modal e fade
const toggleModal = () => {
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
};

// aoClicar no botão execute a função toggleModal
[openModalButton, closeModalButton, fade].forEach((elemento) => {
  elemento.addEventListener("click", () => toggleModal());
});

// Resposta Dinamica do FAQ
document.addEventListener("DOMContentLoaded", function () {
  // Selecionando todos os itens da lista
  const listItems = document.querySelectorAll("#modal-list li");

  // Seleciona o fundo do modal e o próprio modal
  const fade = document.getElementById("fade");
  const modal = document.getElementById("modal");

  // Função para remover todos os parágrafos
  function removeParagraphs() {
    listItems.forEach((li) => {
      const existingParagraph = li.querySelector("p");
      if (existingParagraph) {
        li.removeChild(existingParagraph);
      }
    });
  }

  // Adiciona um evento de clique a cada item da lista
  listItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      // Impede a propagação do clique para o modal
      event.stopPropagation();
      // Remove todos os parágrafos existentes
      removeParagraphs();

      // Verifica se o item clicado já tem um parágrafo
      const existingParagraph = this.querySelector("p");
      if (!existingParagraph) {
        // Cria um novo parágrafo
        const paragraph = document.createElement("p");
        paragraph.textContent = "Este é um parágrafo adicionado dinamicamente.";

        // Adiciona o parágrafo ao item da lista clicado
        this.appendChild(paragraph);
      }
    });
  });

  // Adiciona um evento de clique ao fundo do modal
  fade.addEventListener("click", removeParagraphs);
  // Adiciona um evento de clique ao próprio modal
  modal.addEventListener("click", removeParagraphs);
});
