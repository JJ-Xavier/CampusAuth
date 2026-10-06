import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { buscarUsuario } from "./db.js";
import { definirCarregando } from "./formulario.js";

const carregando = document.getElementById("carregando");
const conteudo = document.getElementById("conteudo");
const botaoSair = document.getElementById("btn-sair");

const formatoData = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" });

function preencher(id, texto) {
  document.getElementById(id).textContent = texto;
}

// "João Silva" vira "JS"; um nome só vira a primeira letra.
function iniciais(nome) {
  const partes = nome.split(/\s+/).filter(Boolean);
  const letras = partes.length > 1 ? partes[0][0] + partes.at(-1)[0] : partes[0]?.[0] ?? "?";
  return letras.toUpperCase();
}

function descreverProvedor(dados, usuario) {
  const provedor = dados?.provedor ?? (usuario.providerData[0]?.providerId === "google.com" ? "google" : "senha");
  return provedor === "google" ? "Google" : "E-mail e senha";
}

// Requisito 4: o conteúdo começa escondido e só aparece depois que o Firebase confirma a sessão.
onAuthStateChanged(auth, async (usuario) => {
  if (!usuario) {
    window.location.replace("index.html");
    return;
  }

  // O Firestore completa o que o Auth não tem (nome de quem se cadastrou e o último acesso do bônus).
  let dados = null;
  try {
    dados = await buscarUsuario(usuario.uid);
  } catch (erro) {
    console.error(erro);
  }

  // Requisito 5: nome e e-mail do usuário logado.
  const nome = usuario.displayName || dados?.nome || usuario.email;
  const ultimoAcesso = dados?.ultimoAcesso?.toDate() ?? new Date(usuario.metadata.lastSignInTime);

  preencher("nome", nome);
  preencher("email", usuario.email);
  preencher("topo-nome", nome);
  preencher("topo-email", usuario.email);
  preencher("avatar", iniciais(nome));
  preencher("dado-nome", nome);
  preencher("dado-email", usuario.email);
  preencher("dado-provedor", descreverProvedor(dados, usuario));
  preencher("dado-acesso", formatoData.format(ultimoAcesso));

  carregando.hidden = true;
  conteudo.hidden = false;
});

// Requisito 6: encerra a sessão e volta para o login.
botaoSair.addEventListener("click", async () => {
  definirCarregando(botaoSair, true);
  await signOut(auth);
  window.location.replace("index.html");
});
