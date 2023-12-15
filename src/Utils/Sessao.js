export const Sessao = {
    // Variaveis
    user: undefined,
    id: undefined,
    token: undefined,
    roles: undefined,
    
    names:{
        user: "user"
    },

    // Gets
    get user(){
        return JSON.parse(sessionStorage.getItem(Sessao.names.user));
    },
    get id(){
        const user = Sessao.user;
        return user? user.id : undefined;  
    },
    get token(){
        const user = Sessao.user;
        return user? user.token : undefined;  
    },
    get roles(){
        const user = Sessao.user;
        return user? user.roles : undefined;  
    },
    
    // Sets
    set user(user){
        return sessionStorage.setItem(Sessao.names.user, JSON.stringify(user));
    },

    //Outros
    clear(){
       sessionStorage.clear(); 
    },
};