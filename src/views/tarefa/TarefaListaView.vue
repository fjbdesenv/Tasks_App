<template>
  <div class="container d-flex flex-row flex-wrap">
    <template v-for="(tarefa, index) in listaTarefas" :key="index">
      <CardTarefaComponent 
        :titulo="tarefa.titulo" 
        :descricao="tarefa. descricao" 
        :data="tarefa.data" 
        :horarioInicio="tarefa.horarioInicio"
        :horarioFim="tarefa.horarioFim"
        :status="tarefa.status"
      />
    </template>
  </div>
</template>

<script>
import CardTarefaComponent from "@/Components/Card/CardTarefaComponent";
import { ApiTask } from "@/Services/ApiTask";


export default {
  name: 'TarefaListaView',
  data: () => ({
    listaTarefas: []
  }),
  components: {
    CardTarefaComponent
  },
  beforeMount() {
    ApiTask.usuario.tarefas.getAll(20)
      .then(response => this.listaTarefas = response.data)
      .catch(error => console.error(error.message));
  }
}
</script>
