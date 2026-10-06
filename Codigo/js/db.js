// Acesso ao Firestore: coleção `usuarios` (um documento por pessoa) e `acessos` (um documento por login).
import { db } from "./firebase-config.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  limit,
  setDoc,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

// "Joao@Teste.com " e "joao@teste.com" precisam contar como o mesmo e-mail.
export function normalizarEmail(email) {
  return email.trim().toLowerCase();
}

export async function emailJaCadastrado(email) {
  const consulta = query(
    collection(db, "usuarios"),
    where("email", "==", normalizarEmail(email)),
    limit(1)
  );
  const resultado = await getDocs(consulta);
  return !resultado.empty;
}

export async function buscarUsuario(uid) {
  const documento = await getDoc(doc(db, "usuarios", uid));
  return documento.exists() ? documento.data() : null;
}

// Cria `usuarios/{uid}` só se ainda não existir, para não sobrescrever `criadoEm` a cada login com Google.
export async function salvarUsuario(usuario, { nome, provedor }) {
  const referencia = doc(db, "usuarios", usuario.uid);
  const existente = await getDoc(referencia);
  if (existente.exists()) return;

  await setDoc(referencia, {
    nome,
    email: normalizarEmail(usuario.email),
    provedor,
    criadoEm: serverTimestamp()
  });
}

// Bônus: guarda cada login no histórico e atualiza o último acesso do usuário.
export async function registrarAcesso(usuario) {
  const ultimoAcesso = new Date();

  await addDoc(collection(db, "acessos"), {
    nome: usuario.displayName,
    email: usuario.email,
    ultimoAcesso
  });

  await setDoc(doc(db, "usuarios", usuario.uid), { ultimoAcesso }, { merge: true });
}
