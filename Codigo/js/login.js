import { auth } from "./firebase-config.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { normalizarEmail, salvarUsuario, registrarAcesso } from "./db.js";
import { mensagemDeErro } from "./erros.js";
import { sincronizarErros, ativarMostrarSenha, definirCarregando } from "./formulario.js";
import { redirecionarSeLogado } from "./sessao.js";

const botaoGoogle = document.getElementById("btn-google");
const formulario = document.getElementById("form-login");
const botaoEntrar = document.getElementById("btn-entrar");
const mensagem = document.getElementById("mensagem");

redirecionarSeLogado();
sincronizarErros(formulario);
ativarMostrarSenha(formulario);

const provedorGoogle = new GoogleAuthProvider();
// Mostra sempre a escolha de conta, para dar para trocar de conta depois de sair.
provedorGoogle.setCustomParameters({ prompt: "select_account" });

// Passo comum aos dois tipos de login: garante o usuário no Firestore, registra o acesso e entra.
async function concluirLogin(usuario, provedor) {
  await salvarUsuario(usuario, { nome: usuario.displayName, provedor });
  await registrarAcesso(usuario);
  window.location.href = "restrita.html";
}

// Enquanto um login está em andamento, os dois botões ficam bloqueados.
function bloquear(botaoAtivo, bloqueado) {
  definirCarregando(botaoAtivo, bloqueado);
  const outro = botaoAtivo === botaoGoogle ? botaoEntrar : botaoGoogle;
  outro.disabled = bloqueado;
}

function mostrarErro(erro) {
  console.error(erro);
  mensagem.textContent = mensagemDeErro(erro);
}

botaoGoogle.addEventListener("click", async () => {
  bloquear(botaoGoogle, true);
  mensagem.textContent = "";

  try {
    const { user } = await signInWithPopup(auth, provedorGoogle);
    await concluirLogin(user, "google");
  } catch (erro) {
    mostrarErro(erro);
    bloquear(botaoGoogle, false);
  }
});

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  bloquear(botaoEntrar, true);
  mensagem.textContent = "";

  try {
    const email = normalizarEmail(formulario.email.value);
    const { user } = await signInWithEmailAndPassword(auth, email, formulario.senha.value);
    await concluirLogin(user, "senha");
  } catch (erro) {
    mostrarErro(erro);
    bloquear(botaoEntrar, false);
  }
});
