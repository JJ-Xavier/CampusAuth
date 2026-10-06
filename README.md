# CampusAuth

Área restrita de um sistema acadêmico com controle de acesso usando **Firebase Authentication** e **Cloud Firestore**. Só usuários autenticados acessam a página protegida.

> Atividade prática: Controle de Acesso e Cadastro de Usuários com Firebase.
> Todos os requisitos e o bônus estão implementados. O andamento detalhado está em [Docs/Projplan.md](Docs/Projplan.md).

## Funcionalidades

| Requisito | Como funciona | Onde está |
| --- | --- | --- |
| 1. Login com Google | Botão "Entrar com Google" (`signInWithPopup`) | `js/login.js` |
| 2. Cadastro com e-mail e senha | Formulário com Nome, E-mail e Senha (`createUserWithEmailAndPassword` + `updateProfile` para salvar o nome) | `js/cadastro.js` |
| 3. E-mail duplicado | Antes de criar a conta, consulta `usuarios` no Firestore. Se o e-mail já existir, mostra `alert("Este e-mail já está cadastrado.")` e não grava nada | `js/cadastro.js`, `js/db.js` |
| 4. Página protegida | `onAuthStateChanged()` só mostra o conteúdo com usuário logado; sem login, volta para o login | `js/restrita.js` |
| 5. Dados do usuário | "Bem-vindo(a), {nome}", e-mail, forma de login e último acesso | `js/restrita.js` |
| 6. Logout | Botão "Sair" (`signOut()`) e volta para o login | `js/restrita.js` |
| Bônus: histórico de acessos | A cada login grava `{ nome, email, ultimoAcesso: new Date() }` em `acessos` e atualiza o último acesso do usuário | `js/db.js` |

Também tem login com e-mail e senha na tela inicial (para quem se cadastrou entrar de novo) e, se a pessoa já estiver logada, o login e o cadastro levam direto para a área restrita.

## Tecnologias

- HTML, CSS e JavaScript (ES modules), sem framework
- Firebase JS SDK 12 modular, carregado pelo CDN (Authentication + Firestore)
- `live-server` via npm para rodar localmente

## Estrutura

```
package.json                 # script "npm run dev"
Codigo/
├── index.html               # login (Google e e-mail/senha)
├── cadastro.html            # cadastro de usuário
├── restrita.html            # área protegida
├── firestore.rules          # regras de segurança do Firestore
├── css/style.css
└── js/
    ├── firebase-config.js   # inicializa o Firebase e exporta auth e db
    ├── db.js                # usuarios, acessos e checagem de e-mail duplicado
    ├── erros.js             # mensagens de erro do Firebase em português
    ├── formulario.js        # mostrar senha, carregando, erros acessíveis
    ├── sessao.js            # quem já está logado vai direto para a área restrita
    ├── login.js
    ├── cadastro.js
    └── restrita.js
Docs/
├── Regras-Do-Projeto.docx   # enunciado da atividade
└── Projplan.md              # planejamento do projeto
```

## Como rodar

**Pré-requisitos:** [Node.js](https://nodejs.org) instalado.

1. Instale as dependências:
    ```bash
    npm install
    ```
2. Suba o servidor local:
    ```bash
    npm run dev
    ```
    Abre em `http://localhost:5500` e recarrega a cada arquivo salvo.
3. Para parar: **Ctrl + C** no terminal (se o Windows perguntar "Deseja finalizar o arquivo em lotes (S/N)?", responda `S`).

> Use `localhost` e não abra os arquivos direto pelo explorador (`file://`): o login com Google e os ES modules só funcionam pelo servidor.

### Usando outro projeto do Firebase

O código já aponta para o projeto `cadastro-6866c`. Para usar outro:

1. Registre um app Web e copie o `firebaseConfig` para `Codigo/js/firebase-config.js`.
2. Em **Authentication → Sign-in method**, ative **Google** e **E-mail/senha**.
3. Crie o banco **Firestore** e publique o conteúdo de `Codigo/firestore.rules` em **Firestore Database → Regras**.

## Banco de dados

| Coleção | Conteúdo |
| --- | --- |
| `usuarios/{uid}` | `nome`, `email` (minúsculo), `provedor` (`google` ou `senha`), `criadoEm`, `ultimoAcesso` |
| `acessos/{id}` | `nome`, `email`, `ultimoAcesso` (um documento por login) |

### Regras de segurança

- A consulta por e-mail em `usuarios` é liberada sem login, mas só com 1 resultado: é a checagem de e-mail duplicado, que roda antes de a conta existir.
- Cada usuário lê e cria apenas o próprio documento em `usuarios`; depois disso, só o `ultimoAcesso` pode mudar.
- Em `acessos`, só o usuário logado cria registros com o próprio e-mail; ninguém lê nem altera o histórico pelo site.

## Interface

Feita para computador. Cada tela ocupa a janela inteira sem rolagem: o tamanho base acompanha a altura da tela (`clamp(0.875rem, 0.5rem + 1svh, 1.125rem)`) e, em janelas baixas, entra uma versão compacta. Os erros dos campos só aparecem depois que a pessoa sai do campo (`:user-invalid`) e são anunciados para leitores de tela.

## Documentação

- [Regras do projeto](Docs/Regras-Do-Projeto.docx): enunciado e critérios de avaliação
- [Projplan](Docs/Projplan.md): áreas de trabalho, checklist e decisões
