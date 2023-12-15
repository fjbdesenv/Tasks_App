import { Storage, Sessao } from "@/Utils";


export const Headers = () => {
    let user = Storage.user || Sessao.user;
    if(!user) user = { token: '' };
    console.log(Sessao.user, Storage.user);
    return { 
        "Authorization": "Bearer " + user.token,
        "Content-Type": "application/json"
    }
}