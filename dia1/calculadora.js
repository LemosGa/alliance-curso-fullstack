import {Router} from 'express' //importa biblioteca Router (express servidor online)
import path from 'path';
const router = Router(); // declarou uma variavel para controle de endereços

router.get('/', (req,res) => { //especifico o endereço (req e res = entrada e saida) 
 res.sendFile(path.join(__dirname,'Index.html')); // retorna tudo que estiver no Index.html
});

router.post('/',(req,res)=>{

    let operando1 =  req.body.operando1;
    let operando2 =  req.body.operando2;
    let operador =  req.body.operador;
    let resultado;

    if(operador == '+') resultado = Number(operando1) + Number(operando2);
    else if (operador == '-') resultado = operando1 - operando2;
    else if (operador == '*') resultado = operando1 * operando2;
    else if (operador == '/') resultado = operando1 / operando2;

    res.status = 200;
    res.send(JSON.stringify({resultado}));
}

)

export default router;