<template>

<input v-model="pseudo" placeholder="edit me">
<button v-on:click="validerPseudo">Valider le pseudo</button>
</template>
<script lang="ts">
import store from '../store';
import router from '../router';
import Socketioservice from '@/services/socketio.service';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HelloWorld',

  data() {
      return {
        pseudo : '',
      defaultOptions: {  },
      animationSpeed: 1
      }
  },
  components:{
    
  },
  methods:{
      validerPseudo : function(){
          store.commit({
            type: 'changerPseudo',
            payload : {pseudo : this.pseudo}
          })
          localStorage.pseudo = this.pseudo;
        Socketioservice.enterPseudo(localStorage.pseudo);
        if(store.state.pseudo != '' && store.state.salon != ''){
         router.push('/salon/'+store.state.salon);
      }
      }
  },
  props: {
    msg: String,
  },
})
</script>

