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

  const formatKey = (key) => {
    // Passo 1: Substituir "e" entre siglas por marcador temporário (minúsculo)
    let formattedKey = key.replace(/([A-Z]{2,})(e)([A-Z]{2,})/g, "$1{{e}}$3");

    // Passo 2: Adicionar espaço entre letras minúsculas e maiúsculas
    formattedKey = formattedKey.replace(/([a-z])([A-Z])/g, "$1 $2");

    // Passo 3: Restaurar o "e" entre siglas com o marcador temporário e manter ele minúsculo
    formattedKey = formattedKey.replace(/\{\{e\}\}/g, " e ");

    // Passo 4: Capitalizar apenas a primeira letra da string
    formattedKey = formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1);

    // Passo 5: Remover espaços extras no início e no final
    return formattedKey.trim();
  };

  // Submissão do formulário com validação básica.
  const handleSubmit = (event) => {
    event.preventDefault();
    const nome = event.target.nome.value.trim();
    const email = event.target.mail.value.trim();
    const mensagem = event.target.mensagem.value.trim();

    if (!nome || !email || !mensagem) {
      alert("Todos os campos são obrigatórios!");
      return;
    }
    alert("Mensagem enviada com sucesso!");
    event.target.reset();
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Ong Vilma Kano</h1>
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
                                    </span>
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
