<template>
  <div id="app">
      <b-container sm="6">
        <img alt="Vue `logo" src="./assets/logo.png">
        <Calculadora />
      </b-container>
  </div>
</template>

<script>
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Calculadora from './components/Calculadora.vue';

Vue.use(BootstrapVue);

export default {
  name: 'app',
  components: {
    Calculadora
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
