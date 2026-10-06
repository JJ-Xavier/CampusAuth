import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

// Quem já está logado e abre o login ou o cadastro vai direto para a área restrita.
// Só a primeira resposta conta: num login feito na própria página, quem redireciona
// é o fluxo de login, depois de gravar o acesso no Firestore.
export function redirecionarSeLogado() {
  const pararDeOuvir = onAuthStateChanged(auth, (usuario) => {
    pararDeOuvir();
    if (usuario) window.location.replace("restrita.html");
  });
}
