// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA3ZLGxT04h0cMIqR6lcVs9l4BfYqaf13Q",
  authDomain: "projeto-de-peito-aberto.firebaseapp.com",
  databaseURL: "https://projeto-de-peito-aberto-default-rtdb.firebaseio.com",
  projectId: "projeto-de-peito-aberto",
  storageBucket: "projeto-de-peito-aberto.appspot.com",
  messagingSenderId: "445953915839",
  appId: "1:445953915839:web:254f70203962958f38bf0a",
};

// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Função para buscar dados
export const fetchData = () => {
  return database
    .ref("dhttps://projeto-de-peito-aberto-default-rtdb.firebaseio.com") // A referência deve corresponder ao caminho correto no seu Realtime Database
    .once("value")
    .then((snapshot) => {
      const perguntas = {};
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        perguntas[childSnapshot.key] = data; // Armazena cada pergunta no objeto
      });
      return perguntas; // Retorna o objeto com todas as perguntas
    })
    .catch((error) => {
      console.error("Erro ao buscar dados: ", error);
      throw error; // Lança o erro para ser tratado na função chamadora
    });
};
