import { useEffect, useState } from "react";
import { database } from "../db"; // Firebase Database configurado.
import { ref, onValue } from "firebase/database"; // Referência e leitura do Realtime Database.
import styles from "../styles/Home.module.css"; // Estilos CSS.

export default function Home() {
  const [questions, setQuestions] = useState({}); // Estado para armazenar perguntas.
  const [modalVisible, setModalVisible] = useState(false); // Controle da visibilidade do modal.
  const [activeQuestion, setActiveQuestion] = useState(null); // Pergunta ativa.

  // useEffect para buscar dados do Firebase.
  useEffect(() => {
    const questionsRef = ref(database, "perguntas");
    onValue(questionsRef, (snapshot) => setQuestions(snapshot.val() || {}));
  }, []);

  // Alternar visibilidade do modal.
  const toggleModal = () => setModalVisible(!modalVisible);

  // Alternar visibilidade das descrições.
  const toggleDescription = (key) => {
    setActiveQuestion((prevKey) => (prevKey === key ? null : key));
  };

  // Formatar as chaves das subdescrições para exibição legível.
  const formatKey = (key) => {
    return key
      .replace(/([A-Z])/g, " $1") // Adiciona espaço antes das maiúsculas.
      .replace(/^./, (str) => str.toUpperCase()); // Torna a primeira letra maiúscula.
  };

  // Submissão do formulário com validação básica.
  const handleSubmit = (e) => {
    e.preventDefault();
    const nome = e.target.nome.value.trim();
    const email = e.target.mail.value.trim();
    const mensagem = e.target.mensagem.value.trim();

    if (!nome || !email || !mensagem) {
      alert("Todos os campos são obrigatórios!");
      return;
    }
    alert("Mensagem enviada com sucesso!");
    e.target.reset();
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>JavaScript Modal</h1>
        <button onClick={toggleModal}>Abrir</button>

        {/* Modal */}
        {modalVisible && (
          <div>
            <div id="fade" onClick={toggleModal}></div>
            <div id="modal">
              <div id="modal-header">
                <h2>Perguntas Frequentes</h2>
                <button id="close-modal" onClick={toggleModal}>
                  x
                </button>
              </div>
              <div id="modal-body">
                <ol id="modal-list">
                  {/* Renderiza perguntas */}
                  {Object.entries(questions).map(
                    ([key, { titulo, descricao }]) => (
                      <li
                        key={key}
                        onClick={() => toggleDescription(key)}
                        className={
                          key === "7" || key === "8" ? "descricao-special" : ""
                        }
                      >
                        {titulo}
                        <p
                          style={{
                            display: activeQuestion === key ? "block" : "none",
                          }}
                        >
                          {/* Exibe descrição (string ou objeto) */}
                          {typeof descricao === "string" ? (
                            descricao
                          ) : (
                            <ul>
                              {Object.entries(descricao).map(
                                ([subKey, subValue]) => (
                                  <li key={subKey}>
                                    <span className="titulo">
                                      {formatKey(subKey)}:
                                    </span>{" "}
                                    {subValue}
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

                {/* Formulário de contato */}
                <h2 id="modal-title-form">Fale Conosco</h2>
                <form
                  id="modal-form"
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <label htmlFor="nome">Nome</label>
                  <input type="text" name="nome" id="nome" />
                  <label htmlFor="mail">Email</label>
                  <input type="mail" name="mail" id="mail" />
                  <label htmlFor="mensagem">Mensagem</label>
                  <textarea id="mensagem" cols="30" rows="4"></textarea>
                  <button type="submit" id="send-modal">
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
