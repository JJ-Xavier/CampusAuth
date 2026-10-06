import { auth } from "./firebase-config.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { normalizarEmail, salvarUsuario, registrarAcesso } from "./db.js";
import { mensagemDeErro } from "./erros.js";

const botaoGoogle = document.getElementById("btn-google");
const formulario = document.getElementById("form-login");
const botaoEntrar = document.getElementById("btn-entrar");
const mensagem = document.getElementById("mensagem");

const provedorGoogle = new GoogleAuthProvider();
// Mostra sempre a escolha de conta, para dar para trocar de conta depois de sair.
provedorGoogle.setCustomParameters({ prompt: "select_account" });

// Passo comum aos dois tipos de login: garante o usuário no Firestore, registra o acesso e entra.
async function concluirLogin(usuario, provedor) {
  await salvarUsuario(usuario, { nome: usuario.displayName, provedor });
  await registrarAcesso(usuario);
  window.location.href = "restrita.html";
}

function mostrarErro(erro) {
  console.error(erro);
  mensagem.textContent = mensagemDeErro(erro);
}

botaoGoogle.addEventListener("click", async () => {
  botaoGoogle.disabled = true;
  mensagem.textContent = "";

  try {
    const { user } = await signInWithPopup(auth, provedorGoogle);
    await concluirLogin(user, "google");
  } catch (erro) {
    mostrarErro(erro);
    botaoGoogle.disabled = false;
  }
});

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  botaoEntrar.disabled = true;
  mensagem.textContent = "";

  try {
    const email = normalizarEmail(formulario.email.value);
    const { user } = await signInWithEmailAndPassword(auth, email, formulario.senha.value);
    await concluirLogin(user, "senha");
  } catch (erro) {
    mostrarErro(erro);
    botaoEntrar.disabled = false;
  }
});
