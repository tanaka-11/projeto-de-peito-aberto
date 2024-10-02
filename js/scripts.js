import { database } from "./db.js"; // Importa o banco de dados do arquivo db.js
import {
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js"; // Importa funções do Firebase para trabalhar com o banco de dados

// Função para abrir o modal
const openModal = () => {
  // Remove a classe 'hide' para mostrar o modal e a sobreposição
  document.getElementById("modal").classList.remove("hide");
  document.getElementById("fade").classList.remove("hide");
};

// Função para fechar o modal e ocultar todas as descrições
const closeModal = () => {
  // Adiciona a classe 'hide' para esconder o modal e a sobreposição
  document.getElementById("modal").classList.add("hide");
  document.getElementById("fade").classList.add("hide");
  hideAllDescriptions(); // Esconde todas as descrições ao fechar o modal
};

// Função para ocultar todas as descrições dentro do modal
const hideAllDescriptions = () => {
  // Seleciona todos os elementos <p> na lista do modal e os oculta
  document.querySelectorAll("#modal-list p").forEach((element) => {
    element.style.display = "none"; // Esconde a descrição definindo a exibição como 'none'
  });
};

// Função para adicionar um clique ao fundo do modal
const addModalClickListener = () => {
  // Fecha o modal quando clica no fundo
  document.getElementById("fade").addEventListener("click", closeModal);
};

// Função para buscar perguntas do Firebase e preencher a lista
const fetchQuestions = () => {
  // Referência para a seção 'perguntas' no banco de dados do Firebase
  const questionsRef = ref(database, "perguntas");

  // Escuta mudanças nas perguntas
  onValue(questionsRef, (snapshot) => {
    const questions = snapshot.val(); // Obtém as perguntas do banco de dados
    const modalList = document.getElementById("modal-list");
    modalList.innerHTML = ""; // Limpa a lista antes de adicionar novas perguntas

    // Para cada pergunta no banco de dados
    Object.entries(questions).forEach(([key, { titulo, descricao }]) => {
      const li = document.createElement("li"); // Cria um item de lista para cada pergunta
      li.textContent = titulo; // Define o texto do item como o título da pergunta

      const descriptionElement = document.createElement("p"); // Cria um parágrafo para a descrição
      descriptionElement.style.display = "none"; // Começa escondido

      // Verifica se a descrição é uma string ou um objeto
      if (typeof descricao === "string") {
        descriptionElement.textContent = descricao; // Se for uma string, define o texto
      } else if (typeof descricao === "object") {
        const ul = document.createElement("ul"); // Cria uma nova lista para descrições detalhadas
        Object.entries(descricao).forEach(([descKey, descValue]) => {
          const descLi = document.createElement("li"); // Cria um item de lista para cada detalhe
          descLi.textContent = `${descKey}: ${descValue}`; // Formata como "chave: valor"
          ul.appendChild(descLi); // Adiciona o detalhe à lista
        });
        descriptionElement.appendChild(ul); // Adiciona a lista de detalhes à descrição
      }

      // Adiciona um clique no item da lista para mostrar/ocultar a descrição
      li.addEventListener("click", (event) => {
        event.stopPropagation(); // Impede que o clique feche o modal
        hideAllDescriptions(); // Esconde todas as descrições antes de mostrar a nova
        descriptionElement.style.display =
          descriptionElement.style.display === "block" ? "none" : "block"; // Alterna entre mostrar e esconder a descrição
      });

      li.appendChild(descriptionElement); // Adiciona a descrição ao item da lista
      modalList.appendChild(li); // Adiciona o item da lista ao modal
    });
  });
};

// Fecha o modal quando o botão de fechar é clicado
document.getElementById("close-modal").addEventListener("click", closeModal);

// Adiciona um evento para fechar o modal ao clicar no fundo
addModalClickListener();

// Abre o modal quando o botão correspondente é clicado
document.getElementById("open-modal").addEventListener("click", openModal);

// Chama a função para buscar as perguntas do Firebase
fetchQuestions();
