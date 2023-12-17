export function AsycTime(value, time){
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(value)
        }, time);
    });

    return promise;
}
