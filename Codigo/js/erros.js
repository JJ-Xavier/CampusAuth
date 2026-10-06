// Traduz os códigos de erro do Firebase para mensagens em português.
const mensagens = {
  "auth/popup-closed-by-user": "A janela do Google foi fechada antes de terminar o login.",
  "auth/cancelled-popup-request": "A janela do Google foi fechada antes de terminar o login.",
  "auth/popup-blocked": "O navegador bloqueou a janela do Google. Permita pop-ups para localhost e tente de novo.",
  "auth/unauthorized-domain": "Este endereço não está autorizado no Firebase. Abra o site por http://localhost:5500.",
  "auth/operation-not-allowed": "Este tipo de login não está ativado no Firebase.",
  "auth/configuration-not-found": "O Authentication não está ativado neste projeto do Firebase.",
  "auth/network-request-failed": "Sem conexão com o Firebase. Verifique sua internet e tente de novo.",
  "auth/email-already-in-use": "Este e-mail já está cadastrado.",
  "auth/invalid-email": "Digite um e-mail válido.",
  "auth/missing-password": "Digite a senha.",
  "auth/weak-password": "A senha precisa ter pelo menos 6 caracteres.",
  "auth/invalid-credential": "E-mail ou senha incorretos.",
  "auth/user-not-found": "E-mail ou senha incorretos.",
  "auth/wrong-password": "E-mail ou senha incorretos.",
  "auth/user-disabled": "Esta conta foi desativada.",
  "auth/too-many-requests": "Muitas tentativas seguidas. Espere alguns minutos e tente de novo.",
  "permission-denied": "Você entrou, mas o Firestore recusou a gravação. Confira as regras do banco."
};

export function mensagemDeErro(erro) {
  return mensagens[erro.code] ?? "Algo deu errado. Tente de novo.";
}
