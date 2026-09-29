# CampusAuth

Área restrita de um sistema acadêmico com controle de acesso usando **Firebase Authentication** e **Cloud Firestore**. Só usuários autenticados acessam a página protegida.

> Atividade prática: Controle de Acesso e Cadastro de Usuários com Firebase.
> Status: **em desenvolvimento**. O andamento está em [Docs/Projplan.md](Docs/Projplan.md).

## Funcionalidades

| Funcionalidade | Como funciona |
| --- | --- |
| Login com Google | Botão "Entrar com Google" (`signInWithPopup`) |
| Cadastro com e-mail e senha | Formulário com Nome, E-mail e Senha (`createUserWithEmailAndPassword`) |
| Bloqueio de e-mail duplicado | Consulta o Firestore antes de gravar; se o e-mail já existir, mostra "Este e-mail já está cadastrado." e não grava nada |
| Página protegida | `onAuthStateChanged()` manda para o login quem não estiver autenticado |
| Dados do usuário | Mostra "Bem-vindo(a), {nome}" e o e-mail |
| Logout | Botão "Sair" (`signOut()`) volta para o login |
| Histórico de acessos (bônus) | A cada login grava `nome`, `email` e `ultimoAcesso` no Firestore |

## Tecnologias

- HTML, CSS e JavaScript (ES modules), sem framework
- Firebase JS SDK modular (Authentication + Firestore)
- `live-server` via npm para rodar localmente

## Estrutura

```
package.json            # script "npm run dev"
Codigo/
├── index.html          # login (Google e e-mail/senha)
├── cadastro.html       # cadastro de usuário
├── restrita.html       # área protegida
├── css/style.css
├── js/
│   ├── firebase-config.js
│   ├── db.js
│   ├── login.js
│   ├── cadastro.js
│   └── restrita.js
└── firestore.rules
Docs/
├── Regras-Do-Projeto.docx   # enunciado da atividade
└── Projplan.md              # planejamento do projeto
```

## Como rodar

**Pré-requisitos:** [Node.js](https://nodejs.org) instalado e um projeto no [Firebase Console](https://console.firebase.google.com).

1. No Firebase Console:
    - Registre um app Web e copie o `firebaseConfig` para `Codigo/js/firebase-config.js`
    - Em **Authentication**, ative os provedores **Google** e **E-mail/senha**
    - Crie o banco **Firestore**
2. Instale as dependências:
    ```bash
    npm install
    ```
3. Suba o servidor local:
    ```bash
    npm run dev
    ```
    Abre em `http://localhost:5500` e recarrega a cada arquivo salvo.
4. Para parar: **Ctrl + C** no terminal (se o Windows perguntar "Deseja finalizar o arquivo em lotes (S/N)?", responda `S`).

> Use `localhost` e não abra os arquivos direto pelo explorador (`file://`): o login com Google e os ES modules só funcionam pelo servidor.

## Banco de dados

| Coleção | Conteúdo |
| --- | --- |
| `usuarios/{uid}` | `nome`, `email`, `provedor`, `criadoEm`, `ultimoAcesso` |
| `acessos/{id}` | `nome`, `email`, `ultimoAcesso` (um documento por login) |

## Documentação

- [Regras do projeto](Docs/Regras-Do-Projeto.docx): enunciado e critérios de avaliação
- [Projplan](Docs/Projplan.md): áreas de trabalho, checklist e pontos em aberto
