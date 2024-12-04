import { useEffect, useState } from "react"; // Importa useEffect para efeitos colaterais e useState para gerenciar o estado local.
import { database } from "../db"; // Importa a instância do banco de dados Firebase configurada.
import { ref, onValue } from "firebase/database"; // Importa funções do Firebase para referenciar e ler dados do Realtime Database.
import styles from "../styles/Home.module.css"; // Importa os estilos CSS para estilizar o componente.

export default function Home() {
  // Define o estado para armazenar as perguntas do Firebase e o estado para controlar a visibilidade do modal.
  const [questions, setQuestions] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  // useEffect para buscar perguntas no Firebase na montagem do componente.
  useEffect(() => {
    const questionsRef = ref(database, "perguntas"); // Cria uma referência para o caminho "perguntas" no banco de dados.

    // Lê os dados de perguntas em tempo real e armazena no estado 'questions'.
    onValue(questionsRef, (snapshot) => setQuestions(snapshot.val() || {}));
  }, []); // O array vazio [] indica que o efeito executa apenas uma vez na montagem do componente.

  // Função para alternar a visibilidade do modal.
  const toggleModal = () => setModalVisible(!modalVisible);

  // Função para alternar a exibição da descrição ao clicar na pergunta.
  const toggleDescription = (event) => {
    const desc = event.target.querySelector("p"); // Busca o elemento <p> de descrição dentro do <li> clicado.
    if (desc)
      desc.style.display = desc.style.display === "block" ? "none" : "block"; // Alterna entre exibir ou esconder a descrição.
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>JavaScript Modal</h1>
        <button onClick={toggleModal}>Abrir</button>{" "}
        {/* Botão para abrir o modal */}
        {/* Renderiza o modal apenas se modalVisible for true */}
        {modalVisible && (
          <div>
            <div id="fade" onClick={toggleModal}></div>{" "}
            {/* Fundo que permite fechar o modal ao clicar fora */}
            {/* Estrutura do modal */}
            <div id="modal">
              <div id="modal-header">
                <h2>Perguntas Frequentes</h2>
                <button onClick={toggleModal}>x</button>{" "}
                {/* Botão para fechar o modal */}
              </div>
              <div id="modal-body">
                <ol id="modal-list">
                  {/* Mapeia as perguntas e renderiza um item <li> para cada uma */}
                  {Object.entries(questions).map(
                    ([key, { titulo, descricao }]) => (
                      <li
                        key={key}
                        onClick={toggleDescription}
                        className={
                          key === "7" || key === "8" ? "descricao-special" : ""
                        }
                      >
                        {titulo} {/* Título da pergunta */}
                        {/* Descrição oculta por padrão */}
                        <p style={{ display: "none" }}>
                          {typeof descricao === "string" ? (
                            descricao // Se a descrição for texto, exibe diretamente.
                          ) : (
                            <ul>
                              {/* Caso a descrição seja um objeto, renderiza cada item em uma lista */}
                              {Object.entries(descricao).map(
                                ([subKey, subValue]) => (
                                  <li key={subKey}>
                                    <span className="titulo">{subKey}:</span>{" "}
                                    {subValue} {/* Subtítulo e valor */}
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </p>
                      </li>
                    )
                  )}
                </ol>

                {/* Formulário de contato dentro do modal */}
                <h2 id="modal-title-form">Fale Conosco</h2>
                <form id="modal-form" autoComplete="off">
                  <label htmlFor="nome">Nome</label>
                  <input type="text" name="nome" id="nome" />
                  {/* Campo para nome */}
                  <label htmlFor="mail">Email</label>
                  <input type="mail" name="mail" id="mail" />
                  {/* Campo para email */}
                  <label htmlFor="mensagem">Mensagem</label>
                  <textarea id="mensagem" cols="30" rows="4"></textarea>
                  {/* Campo para mensagem */}
                  <button type="submit" id="send-modal">
                    Enviar
                  </button>{" "}
                  {/* Botão de envio do formulário */}
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
