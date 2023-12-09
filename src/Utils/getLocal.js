export const getLocal = (item) =>{
    return localStorage.getItem(item) || sessionStorage.getItem(item);
};