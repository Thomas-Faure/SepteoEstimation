import {createStore} from 'vuex'

export default createStore({
    state:{
    pseudo: '',
    salon: '',
    vote:'',
    showCards:false,
    moyenneCartes : 0,
    listeUtilisateur: undefined,
    },
    mutations : {
        changerPseudo(state,value){
            state.pseudo = value.payload.pseudo;
        },
        changerMoyenne(state,value){
            state.moyenneCartes = value.payload.moyenneCartes;
        },
        changerSalon(state,value){
            state.salon = value.payload.salon;
        },
        showCards(state,value){
            state.showCards = value.payload.valeur;
        },
        vote(state,value){
            state.vote = value.payload.valeur;
        },
        changerListeUtilisateur(state,value){
            state.listeUtilisateur = value.payload.liste;
        }
    },
    actions:{

    },
    modules:{

    }
})