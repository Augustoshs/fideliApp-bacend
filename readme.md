# Aplicação backend fideli App

## Tecnologias utilizadas

- Node.js
- Fastify
- PostgreSQL
- Prisma
- Zod

## Como rodar o projeto

1. Clone o repositório
2. Instale as dependências
3. Crie um arquivo .env com as variáveis de ambiente, seguindo o exemplo do arquivo .env.example
4. Rode as migrations com o comando `npx prisma migrate dev`
5. Rode o projeto com o comando `npm run dev`

## Rotas

#### POST /auth/create

Cria um usuário

```json
{
  "email": "teste@gmail.com",
  "cpf": "123.456.789-12",
  "password": "teste"
}
```

#### POST /auth/login

Login de um usuário

```json
{
  "email": "teste@gmail.com",
  "password": "teste"
}
```

#### POST /card/create
```json
{
    "cardName": "Cartão de Crédito",
    "cardDigits": "1234 5678 1234 5678",
    "userId": 1
}
```

#### GET /card/:id
Retorna um cartão específico.
