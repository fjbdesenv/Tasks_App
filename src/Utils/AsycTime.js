export function AsycTime(value){
    const time = process.env.VEU_APP_TIME_MESSAGE || 3000;
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(value)
        }, time);
    });

    return promise;
}
