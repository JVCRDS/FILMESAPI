📘 API de Catálogo de Filmes

Curso: Análise e Desenvolvimento de Sistemas
Disciplina: Programação Web

🎯 Descrição do Projeto

Este projeto consiste no desenvolvimento de uma API REST para gerenciamento de um catálogo de filmes.
Ele foi criado como atividade prática da disciplina de Programação Web, com o objetivo de aplicar conceitos fundamentais de desenvolvimento backend moderno.

A API permite que usuários consultem, registrem, atualizem e excluam informações sobre filmes. Além disso, foi implementado um sistema de autenticação para garantir acesso seguro às funcionalidades sensíveis. Toda a API também conta com documentação formal utilizando Swagger, facilitando o uso e a compreensão dos endpoints.

🛠️ Tecnologias e Conceitos Aplicados
✔️ ORM (Object-Relational Mapping)

Para atender ao requisito da disciplina, foi utilizada uma biblioteca ORM para manipular o banco de dados de maneira simples, organizada e sem escrever SQL manualmente. Isso garante mais segurança, melhor manutenção e um padrão profissional de desenvolvimento.

✔️ Autenticação

A API implementa autenticação baseada em tokens, garantindo que apenas usuários autorizados possam realizar operações como cadastro, edição e exclusão de filmes. Endpoints sensíveis estão protegidos, seguindo as boas práticas de segurança em APIs modernas.

✔️ Documentação (Swagger)

Toda a API foi documentada utilizando Swagger.
Essa documentação gera uma interface visual onde qualquer pessoa consegue testar os endpoints, ver suas descrições, parâmetros necessários e tipos de respostas. Isso é essencial para a clareza do projeto e para facilitar futuras evoluções.

🧩 Funcionalidades do Sistema

Consulta geral de filmes

Consulta por ID, título ou gênero

Cadastro de novos filmes

Atualização de filmes existentes

Exclusão de registros

Sistema de login com geração de token

Rotas protegidas para operações críticas

Documentação interativa via navegador

🎓 Objetivos de Aprendizado

Durante o desenvolvimento da API, foram praticadas e consolidadas habilidades importantes, tais como:

Construção de APIs RESTful

Configuração de banco de dados relacional

Modelagem e manipulação de entidades com ORM

Implementação de autenticação baseada em token

Utilização de documentação automática

Organização de um projeto em camadas lógicas (rotas, modelos, controle etc.)

Tratamento de erros e respostas HTTP adequadas

Esse projeto representa um passo importante para a formação como desenvolvedor, pois consolida o uso de tecnologias amplamente adotadas no mercado.

🚀 Como Utilizar a API

A API pode ser acessada localmente após a instalação das dependências e execução do servidor.
A documentação completa pode ser consultada via Swagger, permitindo testar todas as rotas de forma prática.

## 🔐 Autenticação com JWT

O projeto implementa autenticação baseada em tokens JWT (JSON Web Token). Para acessar os endpoints protegidos, você precisa:

### 1️⃣ Fazer Login

**POST** `/auth/login`

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Resposta (200):**

```json
{
  "mensagem": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "24h"
}
```

### 2️⃣ Usar o Token

Envie o token no header `Authorization` com o prefixo `Bearer `:

```
Authorization: Bearer seu_token_aqui
```

### 3️⃣ Acessar Endpoints Protegidos

Todos os endpoints de `/filmes` requerem autenticação:

- `GET /filmes` - Listar filmes
- `GET /filmes/:id` - Buscar filme por ID
- `POST /filmes` - Criar filme
- `PUT /filmes/:id` - Atualizar filme
- `DELETE /filmes/:id` - Deletar filme

⚠️ **Sem token:** `401 Unauthorized`
⚠️ **Token inválido/expirado:** `401 Token inválido ou expirado`

📚 Conclusão

O desenvolvimento desta API proporcionou uma visão completa do processo de criação de um backend profissional, unindo banco de dados, regras de negócio, autenticação e documentação.
O projeto cumpre todos os requisitos solicitados pelo professor e serve como base sólida para implementações mais complexas no futuro.
