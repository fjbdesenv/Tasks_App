import axios from "axios";
import { Headers } from "@/Utils";

const InstanceAxios = axios.create({
  baseURL: process.env.VUE_APP_URL_API_TASK,
});

const ApiTask = {
  auth: (auth) => InstanceAxios.post(`/auth`, auth),
  usuario: {
    getAll: () => InstanceAxios.get(`/usuarios`, { headers: Headers() }),
    getId: (idUser) => InstanceAxios.get(`/usuarios/${idUser}`, { headers: Headers() }),
    post: (user) => InstanceAxios.post(`/usuarios`, user),
    put: (idUser, user) => InstanceAxios.put(`/usuarios/${idUser}`, user, { headers: Headers() }),
    delete: (idUser) => InstanceAxios.delete(`/usuarios/${idUser}`, { headers: Headers() }),

    tarefas: {
      getAll: (idUser) => InstanceAxios.get(`/usuarios/${idUser}/tarefas`, { headers: Headers() }),
      getId: (idUser, idTask) => InstanceAxios.get(`/usuarios/${idUser}/tarefas/${idTask}`, { headers: Headers() }),
      post: (idUser, tarefa) => InstanceAxios.post(`/usuarios/${idUser}/tarefas`, tarefa, { headers: Headers() }),
      put: (idUser, idTask, tarefa) => InstanceAxios.put(`/usuarios/${idUser}/tarefas/${idTask}`, tarefa, { headers: Headers() }),
      delete: (idUser, idTask) => InstanceAxios.delete(`/usuarios/${idUser}/tarefas/${idTask}`, { headers: Headers() }),
    },
  },
  tarefas: {
    getAll: () => InstanceAxios.get(`/tarefas`, { headers: Headers() }),
    getId: (idTask) => InstanceAxios.get(`/tarefas/${idTask}`, { headers: Headers() }),
    post: (tarefa) => InstanceAxios.post(`/tarefas`, tarefa, { headers: Headers() }),
    put: (idTask, tarefa) => InstanceAxios.put(`/tarefas/${idTask}`, tarefa, { headers: Headers() }),
    delete: (idTask) => InstanceAxios.delete(`/tarefas/${idTask}`, { headers: Headers() }),
  },
};

export { ApiTask };
