# Projeto de Cadastro de Desenvolvedores 🚀

O projeto consiste em uma aplicação para cadastro de desenvolvedores associados a diferentes níveis. A aplicação é composta por um backend que oferece uma API RESTful e um frontend que é uma SPA (Single Page Application) interligada à API.📚

## Estrutura do Projeto 📂

```
- 📂dev-system
  - 📂backend
    - 🐳 Dockerfile
  - 📂frontend
    - 🐳 Dockerfile
  🐳 docker-compose.yml
```

## Requisitos
    - Docker e Docker Compose

## Como rodar o projeto 🚀

1. Clone o repositório 

    ```bash
    git clone https://github.com/ResendiK2/dev-system.git
    ```
2. Entre na pasta do projeto

    ```bash
    cd dev-system
    ```
3. Criar o arquivo .env na pasta backend seguindo o exemplo do arquivo .env.example

4. Execute o comando

    ```bash
    docker-compose up --build
    ```
5. Acesse a aplicação no navegador

    ```bash
    http://localhost:3000
    ```
6. Para encerrar a aplicação, execute o comando

    ```bash
    docker-compose down
    ```

7. Para rodar os testes
    - Testes do backend
    ```bash
        cd backend && npm run test
    ```

    - Testes do frontend
    ```bash
        cd frontend && npm run test
    ```	

## Tecnologias Utilizadas 🛠
Backend: Node.js, Express.js, Prisma ORM, PostgreSQL
Frontend: Next.js, Tailwind CSS, Shadcn/ui

## Acesse o projeto em produção 🌐

  - [Dev System](https://dev-system-7qch.vercel.app/)
  - [Documentação - API](https://dev-system-api.onrender.com/api/docs/)

