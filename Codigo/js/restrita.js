import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const conteudo = document.getElementById("conteudo");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const botaoSair = document.getElementById("btn-sair");

// O conteúdo começa escondido e só aparece depois que o Firebase confirma a sessão.
onAuthStateChanged(auth, (usuario) => {
  if (!usuario) {
    window.location.replace("index.html");
    return;
  }

  nome.textContent = usuario.displayName || usuario.email;
  email.textContent = usuario.email;
  conteudo.hidden = false;
});

botaoSair.addEventListener("click", async () => {
  await signOut(auth);
  window.location.replace("index.html");
});
