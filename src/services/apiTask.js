import axios from "axios";
import { localGet } from "@/Utils";

const token = localGet('token');
const headers = { 
    Authorization: "Bearer " + token,
    "Content-Type": "application/json"
}

const InstanceAxios = axios.create({
  baseURL: process.env.VUE_APP_URL_API_TASK,
});

const ApiTask = {
  auth: (auth) => InstanceAxios.post(`/auth`, auth),
  usuario: {
    getAll: () => InstanceAxios.get(`/usuarios`, { headers }),
    getId: (idUser) => InstanceAxios.get(`/usuarios/${idUser}`, { headers }),
    post: (user) => InstanceAxios.post(`/usuarios`, user),
    put: (idUser, user) => InstanceAxios.put(`/usuarios/${idUser}`, user, { headers }),
    delete: (idUser) => InstanceAxios.delete(`/usuarios/${idUser}`, { headers }),

    tarefas: {
      getAll: (idUser) => InstanceAxios.get(`/usuarios/${idUser}/tarefas`, { headers }),
      getId: (idUser, idTask) => InstanceAxios.get(`/usuarios/${idUser}/tarefas/${idTask}`, { headers }),
      post: (idUser, tarefa) => InstanceAxios.post(`/usuarios/${idUser}/tarefas`, tarefa, { headers }),
      put: (idUser, idTask, tarefa) => InstanceAxios.put(`/usuarios/${idUser}/tarefas/${idTask}`, tarefa, { headers }),
      delete: (idUser, idTask) => InstanceAxios.delete(`/usuarios/${idUser}/tarefas/${idTask}`, { headers }),
    },
  },
  tarefas: {
    getAll: () => InstanceAxios.get(`/tarefas`),
    getId: (idTask) => InstanceAxios.get(`/tarefas/${idTask}`),
    post: (tarefa) => InstanceAxios.post(`/tarefas`, tarefa),
    put: (idTask, tarefa) => InstanceAxios.put(`/tarefas/${idTask}`, tarefa),
    delete: (idTask) => InstanceAxios.delete(`/tarefas/${idTask}`),
  },
};

export { ApiTask };
