// Comportamentos compartilhados pelos formulários de login e cadastro.

// Mantém aria-invalid igual ao estado visual de :user-invalid. Assim o leitor de tela
// só anuncia o erro quando ele aparece na tela: depois que a pessoa sai do campo.
export function sincronizarErros(formulario) {
  const atualizar = (campo) => {
    if (!campo.matches?.("input")) return;
    if (campo.matches(":user-invalid")) {
      campo.setAttribute("aria-invalid", "true");
    } else {
      campo.removeAttribute("aria-invalid");
    }
  };

  formulario.addEventListener("blur", (evento) => atualizar(evento.target), true);
  formulario.addEventListener("input", (evento) => {
    if (evento.target.getAttribute?.("aria-invalid") === "true") atualizar(evento.target);
  });
  // Numa tentativa de envio, o navegador dispara "invalid" em cada campo com erro.
  formulario.addEventListener("invalid", (evento) => evento.target.setAttribute("aria-invalid", "true"), true);
}

// Botões "Mostrar" ligados a um campo de senha pelo aria-controls.
export function ativarMostrarSenha(raiz = document) {
  for (const botao of raiz.querySelectorAll("[data-mostrar-senha]")) {
    const campo = document.getElementById(botao.getAttribute("aria-controls"));

    botao.addEventListener("click", () => {
      const mostrar = campo.type === "password";
      campo.type = mostrar ? "text" : "password";
      botao.textContent = mostrar ? "Ocultar" : "Mostrar";
      botao.setAttribute("aria-label", mostrar ? "Ocultar senha" : "Mostrar senha");
    });
  }
}

// Desativa o botão depois de um envio válido (evita envio duplo) e mostra o indicador de carregando.
export function definirCarregando(botao, carregando) {
  botao.disabled = carregando;
  if (carregando) {
    botao.setAttribute("aria-busy", "true");
  } else {
    botao.removeAttribute("aria-busy");
  }
}
