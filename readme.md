## API Banco Digital 🏦
---
- Api para o sistema de um banco digital dockerizada

## Features ⭐🎯 
- Cadastro de usuário
- Sistema de autenticação com login
- Introdução de tokens
- Criptografia de senha de usuário
- Cadastro de conta
- Realização de transferências cashOut/cashIn
- Controle de acesso, por parte de visualização sensiveis de outros usuários.
- Resistro de transferências 
- Busca  por transações
- Filtro de transação por data de realização

## Usage 🚩

* Instalar as dependencias 
    ```
    npm install
    ```

* Definir as variaveis de ambiente
-- Cria um novo arquivo .env na raiz do projeto e definir as configurações desejadas assim como no env.example

* Configura os dados de conexão do banco de dados
-- Ir em src/database/config/config.json, modificar o username, password e database para as configurações de conexão do projeto com o banco de dados.


* Subir as migrations para o banco de dados.
    ```
    npx squelize-cli db:migrate 
    ```

* Inicializar a aplicação
    ```
    npm run start
    ```


## Tecnologias Utilizadas 📝

* bcrypt - encriptografia de senha
* body-parser - analisar os corpos das requisições
* dotenv - salvar as variaveis de ambiente
* express - framework para que gerencia rotas, requisições e verbos http
* express-validator - valida dados de entradas da aplicação
* http-errors - instância erros http
* jsonwebtoken - gera tokens e verifica suas autencidades
* pg - drive para a utilização do banco postgres na aplicação
* sequelize - ORM

### Tecnologias recomendadas

* nodemon - utilizada para manter a aplicação rodando
* sequelize-cli - utilitario de linha de comando do sequelize.