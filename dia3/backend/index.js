import express from './node_modules/express';
import cors from 'cors';

import Usuarios from './usuarios'
import Bicicletas from './Bicicletas'

const app = express();

app.use(express.json());

app.use('/Usuarios', Usuarios);
app.use('/Bicicletas', Bicicletas);

app.use(cors());
app.listen(3000, () =>
    console.log('Servidor rodando na porta 3000!'), 
);
