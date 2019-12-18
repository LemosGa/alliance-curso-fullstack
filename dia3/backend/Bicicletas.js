import {Router} from 'express'
import { Client } from 'pg'

const router = Router();
router.get('/',async (req,res) =>{
    let resultado = [];
    const client = criarClient()

    await client.connect();
    let queryResult = await client.query("select codigo, ativo from bicicletas")
    for(let row of queryResult.rows){

        resultado.push(
            {
                codigo: row.codigo,
                ativo: row.ativo
            }
        )
    }

    await client.end();
    res.send(JSON.stringify(resultado));

});

router.post('/', async(req,res)=>{
    let payload = req.body;
    let sql = `insert into bicicletas(codigo,ativo) VALUES (
    '${payload.codigo}','${payload.ativo}')`;

    const client = criarClient();
    await client.connect();
    await client.query(sql);
    await client.end();
    
    res.status (201);
    res.send();
})

router.put('/:codigo', async(req,res)=>{

    let codigo = req.params.codigo;
    let payload = req.body;

    let sql = `update bicicletas SET 
    codigo = '${payload.codigo}',
    ativo = '${payload.ativo}'
    where
    codigo = '${codigo}'`;
    const client = criarClient();
    await client.connect();
    await client.query(sql);
    await client.end();

    res.status(204);
    res.send();

})


router.delete('/:codigo', async(req,res)=> { //criando uma rota com o nome delete, que consulta pelo /delete
    let codigo = req.params.codigo; //criando objeto codigo 

    let sql = `delete from bicicletas 
    where 
    codigo = '${codigo}'`; // objeto sql com as instruções de delete

    const client = criarClient(); //criando o conexao com banco
    await client.connect();
    await client.query(sql); // passando o codigo sql 
    await client.end(); //fechando conexao

    res.status(204); // mensagem para o navegador informando que deu certo
    res.send();
})

function criarClient(){

    return new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'db_dia3',
        password:'123456',
        port: 5432
    
    })}

export default router;