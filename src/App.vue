<template>
  <div v-if="$store.state.pseudo != ''">
    <button type="button" v-on:click="deconnexion" class="btn btn-secondary">Déconnexion</button>

  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import 'bootstrap/scss/bootstrap.scss'
import store from './store';
import router from './router'
import SocketioService from './services/socketio.service';

export default {
  name: 'App',
  beforeMount() {
    SocketioService.setupSocketConnection();
  },
    beforeUnmount() {
    SocketioService.disconnect();
  },
        methods:{
      deconnexion : function(){
          store.commit({
            type: 'changerPseudo',
            payload : {pseudo : ''}
          })
          store.commit({
            type: 'changerSalon',
            payload : {salon : ''}
          })
          localStorage.removeItem('pseudo');
          router.push('/');
      }
  },
  mounted : function(){
      if(localStorage.pseudo !== undefined){
            store.commit({
            type: 'changerPseudo',
            payload : {pseudo : localStorage.pseudo}
          })
          SocketioService.enterPseudo(localStorage.pseudo);
      }else{
          store.commit({
            type: 'changerPseudo',
            payload : {pseudo : ''}
          })
      }
    },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
