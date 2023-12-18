import { Storage, Sessao } from "@/Utils";


export const Headers = () => {
    let user = Storage.user || Sessao.user;
    if(!user) user = { token: '' };
    return { 
        "Authorization": "Bearer " + user.token,
        "Content-Type": "application/json"
    }
}