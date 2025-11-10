## Configuração do Ambiente

1. Crie um arquivo `config.env` na raiz do projeto.
2. Crie um banco de dados no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
3. Atualize as variáveis de ambiente com suas próprias credenciais:

   NODE_ENV=development
   PORT=3000
   DATABASE=<CONNECTION_STRING_GERADA_PELO_MONGODB>
   DATABASE_PASSWORD=<PASSWORD_GERADA_PELO_MONGODB>

   4. Abra um terminal no diretorio do projeto
   5. Rode 'npm i' ou 'npm install'
   6. rode 'npm start' para rodar o projeto localmente
