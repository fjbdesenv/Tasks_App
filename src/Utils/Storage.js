export const Storage = {
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
        return JSON.parse(localStorage.getItem(Storage.names.user));
    },
    get id(){
        const user = Storage.user;
        return user? user.id : undefined;  
    },
    get token(){
        const user = Storage.user;
        return user? user.token : undefined;  
    },
    get roles(){
        const user = Storage.user;
        return user? user.roles : undefined;  
    },
    
    // Sets
    set user(user){
        return localStorage.setItem(Storage.names.user, JSON.stringify(user));
    },

    //Outros
    clear(){
        localStorage.clear(); 
    },
};