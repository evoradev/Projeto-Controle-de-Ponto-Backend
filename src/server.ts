import express from 'express';
import logger, { logRequests } from './Log/logger';
import routes from './routes';
import cors from 'cors';
import bodyParser from 'body-parser';
import './db/firebase'; 

const app = express();
const port = 5000;

// Middleware para logar as requisições
app.use(logRequests);

// Habilitando CORS para permitir requisições de outras origens
app.use(cors());

// Middleware para parsear o corpo das requisições como JSON
app.use(bodyParser.json());

// Configurando a rota principal da API
app.use('/api', routes);

// Inicializando o servidor na porta especificada
app.listen(port, () => {
  logger.info(`Servidor rodando em http://localhost:${port}/api`);
});
