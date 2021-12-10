<template>
<p>Vous êtes connecté sur le salon : {{url_data}}</p>
<div class="container">
  <div class="row">
    <div class="col-4">
      <div class="card">
  <div class="card-body">
    <h5 class="card-title">Participants</h5>
      <div v-if="$store.state.listeUtilisateur != undefined">

    <p>Nombre de personnes connectées : {{$store.state.listeUtilisateur.length}}</p>
</div>

    <h1 v-if="$store.state.showCards == true">
      <div v-for="user in $store.state.listeUtilisateur" :key="user.id"><p style="font-size:17px;text-align:left"> 🧑 {{ user.name }} <strong>({{user.vote}})</strong></p></div>
        <button v-on:click="showCards" style="font-size:20px">Cacher 🃏</button>

    </h1>

    <h1 v-else>
      <div v-for="user in $store.state.listeUtilisateur" :key="user.id"><p style="font-size:17px;text-align:left"> 🧑  {{ user.name }} <strong>{{ user.vote != undefined ? '🃏' : '' }}</strong></p></div>
        <button type="button" v-on:click="showCards"  class="btn btn-primary" style="font-size:20px">Montrer 🃏</button>
    </h1>
    <button type="button" v-on:click="resetCards" class="btn btn-primary">Reset les cartes</button>

     <h1 v-if="$store.state.showCards == true" style="font-size:20px">
       La moyenne est de : {{$store.state.moyenneCartes}}
     </h1>
    </div>

  </div>
</div>

    <div class="col-8">
       <div class="container">

  <div class="row " >
    <div class="col-2">
        <EstimationCard numero='0'></EstimationCard>

    </div>
    <div class="col-2">
        <EstimationCard numero='0.5'></EstimationCard>

    </div>
    <div class="col-2">
        <EstimationCard numero='1'></EstimationCard>

    </div>
    <div class="col-2">
      <EstimationCard numero='2'></EstimationCard>
    </div>
    <div class="col-2">
           <EstimationCard numero='3'></EstimationCard>
    </div>
    <div class="col-2">
           <EstimationCard numero='5'></EstimationCard>
    </div>
    <div class="col-2">
           <EstimationCard numero='8'></EstimationCard>
    </div>
    <div class="col-2">
           <EstimationCard numero='13'></EstimationCard>
    </div>
    <div class="col-2">
           <EstimationCard numero='20'></EstimationCard>
    </div>
    <div class="col-2">
        <EstimationCard numero='40'></EstimationCard>
    </div>
    <div class="col-2">
        <EstimationCard numero='100'></EstimationCard>

    </div>
    <div class="col-2">
        <EstimationCard numero='☕'></EstimationCard>

    </div>
        <div class="col-2">
        <EstimationCard numero='?'></EstimationCard>

    </div>
  </div>

</div>
    </div>

  </div>
</div>








</template>

<script>
import { mapState } from 'vuex'
import EstimationCard from '../components/EstimationCard.vue'

import { onUnmounted } from '@vue/runtime-core';
import store from '../store';
import SocketioService from '../services/socketio.service';

export default {
    data(){
        return {
            connection : null,
            url_data: null
        }
    },
    name:'About',
    components:{},

    destroyed: function(){
      SocketioService.disconnectSalon();

    },
       methods:{
      vote : function(){
        SocketioService.vote("10");

      },
      showCards : function(){
        if(store.state.showCards){
                SocketioService.montrerCartes(false);

        }else{
                SocketioService.montrerCartes(true);
        }

      },
      resetCards : function(){
        SocketioService.montrerCartes(false);
        SocketioService.resetCartes(
          
        );



      }
    },
    mounted : function(){
     
      this.url_data=this.$route.params.name;

      if(store.state.pseudo == ''){
         this.$router.push('/?salon='+this.url_data);
         store.commit({
            type: 'changerSalon',
            payload : {salon : this.url_data}
          })
      }else{
        store.commit({
            type: 'changerSalon',
            payload : {salon : this.url_data}
          })
        SocketioService.connectSalon(this.url_data);
      }

    },
        components:{
        EstimationCard,

    }


}
    </script>