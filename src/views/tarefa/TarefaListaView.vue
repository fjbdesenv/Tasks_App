<template>
  <div class="container">
    <AlertComponent v-if="deletado" tipo="sucesso" texto="Deletado com sucesso!" />
    <div class="d-flex flex-row flex-wrap">
      <template v-for="(tarefa, index) in listaTarefas" :key="index">

        <CardTarefaComponent 
          :id="tarefa._id"
          :titulo="tarefa.titulo"
          :descricao="tarefa.descricao"
          :data="tarefa.data"
          :horarioInicio="tarefa.horarioInicio"
          :horarioFim="tarefa.horarioFim"
          :status="tarefa.status"
          @deletarTarefa="deletar"
        />
        
      </template>
    </div>

  </div>
</template>

<script>
import AlertComponent from "@/Components/AlertComponent.vue";
import CardTarefaComponent from "@/Components/Card/CardTarefaComponent";
import { ApiTask } from "@/Services/ApiTask";
import { Storage, Sessao, AsycTime } from "@/Utils";

export default {
  name: 'TarefaListaView',

  data: () => ({
    user: undefined,
    deletado: false,
    listaTarefas: [],
  }),

  methods: {
    deletar(idTask) {
      if (this.user) {
        const idUser = this.user.id;

        ApiTask.usuario.tarefas.delete(idUser, idTask)
          .then(response =>{
            
            this.getLista();
            this.deletado = true;
            window.location.href = '#top';
            
            AsycTime(true, 5000).then(response => {
              this.deletado = response;
            });
            
          })
          .catch(error => console.error(error.message));
      }
    },

    getLista() {

      if (this.user) {
        ApiTask.usuario.tarefas.getAll(this.user.id)
          .then(response => this.listaTarefas = response.data)
          .catch(error => console.error(error.message));
      }
    }
  },
  components: {
    CardTarefaComponent,
    AlertComponent
  },

  beforeMount() {
    this.user = Storage.user || Sessao.user;
    this.getLista();

  }
}
</script>
