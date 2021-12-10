<template>
<div v-if="$store.state.pseudo == ''">
    <Login></Login>
</div>
<div v-else>
    <p>Votre pseudo actuel : {{$store.state.pseudo}}</p>
     <div class="hello">
    <h3>Hello <strong>{{$store.state.pseudo}}</strong> !</h3>
    <lottie
      :options="defaultOptions"
      :height="220"
      :width="180"
      v-on:animCreated="handleAnimation"
    />
  </div>
</div>

</template>
<script>
import animationData from "@/assets/lottie-robot.json";

import Lottie from "vue-lottie";

import Login from '../components/Login.vue'
import SocketioService from '../services/socketio.service';

export default {
    data() {
    return {
      defaultOptions: { animationData: animationData },
      animationSpeed: 1
    };
  },
  mounted : function(){

        SocketioService.disconnectSalon();
      

    },
  
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
    },

    stop: function () {
      this.anim.stop();
    },

    play: function () {
      this.anim.play();
    },

    pause: function () {
      this.anim.pause();
    },

    onSpeedChange: function () {
      this.anim.setSpeed(this.animationSpeed);
    },
  },

    name:'Home',

    
    components:{
        Login,
        Lottie
    }

}

    </script>

    <style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>