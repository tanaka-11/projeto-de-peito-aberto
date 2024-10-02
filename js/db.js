// db.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Configurações do Firebase
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
const app = initializeApp(firebaseConfig);

// Obtém a instância do banco de dados
const database = getDatabase(app);

// Exporta a instância do banco de dados para que outros módulos possam usá-la
export { database };
