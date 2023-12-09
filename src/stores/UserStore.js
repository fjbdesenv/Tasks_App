import { createStore } from "vuex";

export const userStore = createStore({
    
    state(){
        return {
            token: '',
            user: {}
        }
    },

    mutations:{
        setToken(state, token){
            state.token = token;
        },
        setUser(state, user){
            state.id = id;
        }
    },
    
    getters:{
        getToken(state){
            return state.token;
        },
        getUser(state){
            return state.user;
        }
    }
})