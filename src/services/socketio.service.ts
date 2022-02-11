import { io } from 'socket.io-client';
import store from '../store';

class SocketioService {
  socket : any;
  constructor() {}

  setupSocketConnection() {
    this.socket = io('https://aerobic-copilot-341010.oa.r.appspot.com');
    this.socket.on('users', function(data: any){
    store.commit({
        type: 'changerListeUtilisateur',
        payload : {liste : data}
      })
      var b = data.length,
      c = 0, i,
      d = 0;
      for (i = 0; i < b; i++){
          if(data[i].vote != undefined){
            var valeurAAjouter = Number(data[i].vote);
            if(!isNaN(valeurAAjouter)){
                c += valeurAAjouter;
                d++;
            }
          }
     
      }
      var result = c/d;
      if(isNaN(result))
        result = 0
      store.commit({
        type: 'changerMoyenne',
        payload : {moyenneCartes : result}
      })
      var voteActuel = data.find((user:any) => user.name.trim().toLowerCase() === store.state.pseudo.trim().toLowerCase())
      store.commit({
        type: 'vote',
        payload : {valeur : voteActuel.vote}
      });

    })
    this.socket.on('showCards', (data : any) => {

        store.commit({
            type: 'showCards',
            payload : {valeur : data}
          })
        
    });

  }

  disconnect() {
    if (this.socket) {
        this.socket.emit('disconnect', '');

        this.socket.disconnect();
    } 
    
}

enterPseudo(pseudo : string){
    this.socket.emit('enterPseudo', pseudo);

}
connectSalon(room : string){
    this.socket.emit('connectSalon', room);
}
disconnectSalon(){
    this.socket.emit('disconnectSalon', null);

}
vote(vote: any){
    this.socket.emit('vote', vote);

}
montrerCartes(valeur: boolean){
    this.socket.emit('montrerCartes', valeur);
}
resetCartes(){
    this.socket.emit('resetCartes', null);
}

}

export default new SocketioService();