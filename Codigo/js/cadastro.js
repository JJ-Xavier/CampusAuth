import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { emailJaCadastrado, normalizarEmail, salvarUsuario, registrarAcesso } from "./db.js";
import { mensagemDeErro } from "./erros.js";

const MENSAGEM_DUPLICADO = "Este e-mail já está cadastrado.";

const formulario = document.getElementById("form-cadastro");
const botao = document.getElementById("btn-cadastrar");
const mensagem = document.getElementById("mensagem");

// O navegador só dispara o submit quando os campos passam no required/type="email"/minlength.
formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const nome = formulario.nome.value.trim();
  const email = normalizarEmail(formulario.email.value);
  const senha = formulario.senha.value;

  if (!nome) {
    mensagem.textContent = "Digite seu nome.";
    formulario.nome.focus();
    return;
  }

  botao.disabled = true;
  mensagem.textContent = "";

  try {
    // Requisito 3: verifica o Firestore antes de criar a conta e de gravar qualquer dado.
    if (await emailJaCadastrado(email)) {
      alert(MENSAGEM_DUPLICADO);
      return;
    }

    const { user } = await createUserWithEmailAndPassword(auth, email, senha);
    // Sem isso o displayName fica null e o "Bem-vindo(a)" e o bônus gravariam o nome vazio.
    await updateProfile(user, { displayName: nome });
    await salvarUsuario(user, { nome, provedor: "senha" });
    await registrarAcesso(user);
    window.location.href = "restrita.html";
  } catch (erro) {
    console.error(erro);
    // E-mail que existe no Authentication mas não no Firestore (por exemplo, criado pelo Console).
    if (erro.code === "auth/email-already-in-use") {
      alert(MENSAGEM_DUPLICADO);
    } else {
      mensagem.textContent = mensagemDeErro(erro);
    }
  } finally {
    botao.disabled = false;
  }
});
