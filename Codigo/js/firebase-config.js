// Inicializa o Firebase uma única vez. As páginas importam `auth` e `db` daqui.
// A apiKey do Firebase Web não é secreta: quem protege os dados são as regras do Firestore.
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCSX3o9C-x5tL_j6UwTut1zZvpgMS2TfFU",
  authDomain: "cadastro-6866c.firebaseapp.com",
  projectId: "cadastro-6866c",
  storageBucket: "cadastro-6866c.firebasestorage.app",
  messagingSenderId: "939360115991",
  appId: "1:939360115991:web:3a8d32093b65de723bab52",
  measurementId: "G-N46C9FN2R0"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
