export const localGet = (item) =>{
    return localStorage.getItem(item) || sessionStorage.getItem(item);
};

export const localClear = () => {
    localStorage.clear();
    sessionStorage.clear();
}

export const checkToken = () => {
    if(!localGet('token')) window.location.href = '/login/login';
}