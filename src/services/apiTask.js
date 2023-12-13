import axios from "axios";

const InstanceAxios = axios.create({
    baseURL: process.env.VUE_APP_URL_API_TASK,
});

const ApiTask = {
    auth: (auth) => InstanceAxios.post(`/auth`, auth),
    usuario:{
        getAll: () => InstanceAxios.get(`/usuarios`),
        getId: (id) => InstanceAxios.get(`/usuarios/${id}`),
        post: (user) => InstanceAxios.post(`/usuarios`, user),
        put: (id, user) => InstanceAxios.put(`/usuarios/${id}`, user),
        delete: (id) => InstanceAxios.delete(`/usuarios/${id}`),

        tarefas:{
            getAll: () => InstanceAxios.get(`/usuarios/tarefas`),
            getId: (id) => InstanceAxios.get(`/usuarios/tarefas/${id}`),
            post: (tarefa) => InstanceAxios.post(`/usuarios/tarefas`, tarefa),
            put: (id, tarefa) => InstanceAxios.put(`/usuarios/tarefas/${id}`, tarefa),
            delete: (id) => InstanceAxios.delete(`/usuarios/tarefas/${id}`),
        }
    },
    tarefas:{
        getAll: () => InstanceAxios.get(`/tarefas`),
        getId: (id) => InstanceAxios.get(`/tarefas/${id}`),
        post: (tarefa) => InstanceAxios.post(`/tarefas`, tarefa),
        put: (id, tarefa) => InstanceAxios.put(`/tarefas/${id}`, tarefa),
        delete: (id) => InstanceAxios.delete(`/tarefas/${id}`),
    }
    
}

export { ApiTask };