<style>
  .active{
    background-color:grey
  }
  .carte{
    margin-bottom: 10px;
  }
</style>
<template>
  <div class="card" v-bind:class="{ active: ($store.state.vote===this.numero),carte : true }"  v-on:click="vote">
  <div class="">
    <h5 class="card-title"></h5>
    <p class="card-text" style="  overflow: auto;
  white-space: nowrap;">{{numero}}</p>
    <a href="#" class="btn btn-primary stretched-link" hidden>Go</a>
  </div>
</div>
</template>
<script lang="ts">

import store from '../store';
import Component from 'vue-class-component'
import router from '../router';

import SocketioService from '../services/socketio.service';


import { defineComponent } from 'vue'

export default defineComponent({
   props: {
     numero : String,
     },
    data() {
      return {
        activeColor : 'White',

      }
  },
  mounted: async function(){
    if(store.state.pseudo == this.numero){
      this.activeColor = "Grey"
    }
  },
  methods:{
      vote : function(){
        SocketioService.vote(this.numero);
        store.commit({
        type: 'vote',
        payload : {valeur : this.numero}
      
    })

      }
  }
})

</script>

