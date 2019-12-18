<template>
    <b-form>
      <p>
          <b-form-group
            label="Primeiro operando:"
            label-for="txtOperando1">
            <b-form-input id="txtOperando1" v-model="operando1" />
          </b-form-group>
      </p>
      <p>
          <b-form-group
            label="Segundo operando:"
            label-for="txtOperando2">
            <b-form-input id="txtOperando2" v-model="operando2" />
          </b-form-group>
      </p>
      <p>
          <b-form-group
            label="Operador"
            label-for="cboOperador">
            <select name="cboOperador" v-model="operador">
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">*</option>
                <option value="/">/</option>
            </select>
          </b-form-group>
      </p>
      <p>
        <b-button variant="success" v-on:click="calcular()">Calcular</b-button>
      </p>
      <hr />
      <div v-if="historicos.length > 0">
        <h3>Último Resultado: {{ ultimoResultado }}</h3>
        <p />
        <b-row>
            <b-col sm="8">
                <h3>Histórico</h3>
            </b-col>
            <b-col>
                <b-button variant="secondary" v-on:click="limparTudo()">Limpar tudo</b-button>
            </b-col>
        </b-row>
        <b-row v-for="(linha, index) in historicos" v-bind:key="index">
            <b-col sm="8">{{linha.operando1}} {{linha.operador}} {{linha.operando2}} = {{linha.resultado}}</b-col>
            <b-col><a v-on:click.prevent="excluiHistorico(index)">Excluir</a></b-col>
        </b-row>
        <hr />
        <b-row>
            <b-col sm="8">Total calculado</b-col>
            <b-col>{{somaTudo}}</b-col>
        </b-row>
      </div>
    </b-form>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Calculadora',
    data() {
        return {
            operando1: '',
            operando2: '',
            operador: '+',
            ultimoResultado: '',
            historicos: [
                {
                    operando1: '',
                    operando2: '',
                    operador: '',
                    resultado: ''
                }
            ]
        };
    },
    computed: {
        somaTudo() {
            let total = 0;
            for(let linha of this.historicos) {
                total += Number(linha.resultado);
            }
            return total;
        }
    },
    methods: {
        async calcular() {
            /* eslint-disable no-console */
            let pacote = {
                operando1: this.operando1,
                operando2: this.operando2,
                operador: this.operador
            };
            let resultado = await axios.post('http://localhost:3000/calculadora',pacote);
            this.ultimoResultado = resultado.data.resultado;

            this.historicos.unshift({
                operando1: this.operando1,
                operando2: this.operando2,
                operador: this.operador,
                resultado: this.ultimoResultado
            });

            this.operando1 = '';
            this.operando2 = '';
            this.operador = '+';
        },
        excluiHistorico(indice) {
            this.historicos.splice(indice, 1);
        },
        limparTudo() {
            // Remove todos os elementos a partir do 0 até o tamanho do array (logo, todos)
            this.historicos.splice(0,this.historicos.length);
        }
    },
    mounted() {
        this.historicos.pop();
    }
}
</script>