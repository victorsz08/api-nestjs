# API NestJS

Esta é uma API RESTful desenvolvida com [NestJS](https://nestjs.com/) e [Prisma ORM](https://www.prisma.io/), utilizando PostgreSQL como banco de dados. A API gerencia usuários, pedidos (orders) e notas (notes), com autenticação baseada em JWT e controle de acesso por papéis (roles).

## Sumário

- Tecnologias
- Instalação
- Configuração
- Scripts
- Estrutura de Pastas
- Funcionalidades
- Autenticação e Autorização
- Licença

---

## Tecnologias

- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [class-validator](https://github.com/typestack/class-validator)
- [date-fns](https://date-fns.org/)

## Instalação

```sh
git clone https://github.com/seu-usuario/seu-repo.git
cd api-nestjs
npm install
```

## Configuração

1. Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente necessárias, como `DATABASE_URL` e `JWT_SECRET`.
2. Gere o client do Prisma e execute as migrações:

```sh
npx prisma generate
npx prisma migrate deploy
```

## Scripts

- `npm run start:dev` — Inicia o servidor em modo desenvolvimento com hot reload.
- `npm run build` — Compila o projeto para produção.
- `npm run start:prod` — Inicia o servidor em modo produção.
- `npm run test` — Executa os testes unitários.

## Estrutura de Pastas

```
src/
  app.module.ts
  main.ts
  domain/
    decorators/
    entities/
    enum/
    interface/
  infra/
    controllers/
    modules/
    prisma/
    validators/
  middleware/
  usecase/
prisma/
  schema.prisma
```

- **domain/**: Entidades, enums, interfaces e decorators do domínio.
- **infra/**: Implementações de repositórios, controllers, módulos, validadores.
- **middleware/**: Middlewares e guards de autenticação/autorização.
- **usecase/**: Casos de uso (aplicação).

## Funcionalidades

- **Usuários**: CRUD de usuários, autenticação, controle de acesso por papel (ADMIN, USER).
- **Pedidos (Orders)**: CRUD de pedidos, atualização de status e agendamento.
- **Notas (Notes)**: CRUD de notas vinculadas a usuários.
- **Autenticação**: Login com JWT, sessão via cookie HTTP Only.

## Autenticação e Autorização

- **Login**: `POST /auth/login` — Retorna JWT em cookie.
- **Proteção de rotas**: Middleware e guard (`RolesGuard`) para proteger rotas por papel.
- **Exemplo de uso de roles**:
  ```ts
  @Roles(Role.ADMIN)
  @Get('/users')
  findAllUsers() { ... }
  ```

## Licença

Este projeto está sob a licença UNLICENSED.

---

> Feito com [NestJS](https://nestjs.com/) 🚀

---

**Observação:** Para mais detalhes sobre endpoints, consulte os controllers em `src/infra/controllers`.