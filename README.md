# PharmaStock

![test and build workflow](https://github.com/CleysonPH/pharmaStock/actions/workflows/test-and-build.yaml/badge.svg)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=CleysonPH_PharmaStock&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=CleysonPH_PharmaStock)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=CleysonPH_PharmaStock&metric=coverage)](https://sonarcloud.io/summary/new_code?id=CleysonPH_PharmaStock)


PharmaStock é uma simples aplicação de gerenciamento de estoque para uma farmácia. A aplicação foi desenvolvida para o desafio técnico da empresa [SalaryFits](https://www.salaryfits.com.br/).

## Tecnologias

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Zod](https://zod.dev/)
- [Vitest](https://vitejs.dev/)

## Como executar o projeto localmente

Clone o projeto e acesse a pasta do mesmo.

```bash
git clone https://github.com/CleysonPH/PharmaStock.git
cd PharmaStock
```

Para iniciá-lo, siga os passos abaixo:
```bash
# Subir serviço de banco de dados com Docker
docker compose up -d

# Criar o arquivo .env
cp .env.example .env

# Instalar as dependências
npm install

# Executar as migrations
npx prisma migrate dev

# Iniciar o projeto
npm run start:dev
```

O app estará disponível no seu browser pelo endereço http://localhost:3000. A documentação da API estará disponível no endereço http://localhost:3000/docs.html.

## Testes

Para executar os testes, utilize o seguinte comando:

```bash
npm run test
```

## Deploy

O projeto está disponível no [fly.io](https://fly.io/). Acesse o projeto [aqui](https://pharmastock.fly.dev/).