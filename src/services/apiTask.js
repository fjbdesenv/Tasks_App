import axios from "axios";

const InstanceAxios = axios.create({
    baseURL: process.env.VUE_APP_URL_API_TASK,
});

const ApiTask = {
    auth: (auth) => InstanceAxios.post('/auth', auth),
}

export { ApiTask };