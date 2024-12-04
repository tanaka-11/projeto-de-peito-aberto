// db.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

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

// Exporta o banco de dados para uso em outros módulos
export const database = getDatabase(app);
