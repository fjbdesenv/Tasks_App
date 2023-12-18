<template>
  <div class="container">
    <Router-link to="/tarefas/cadastro">
      <button class="btn btn-success mt-3"> Nova tarefa </button>
    </Router-link>
    <AlertComponent 
      v-if="mensagem.show" 
      :tipo="mensagem.tipo" 
      :texto="mensagem.texto" 
    />
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
import CardTarefaComponent from "@/Components/Card/CardTarefaComponent.vue";
import { ApiTask } from "@/Services/ApiTask";
import { Storage, Sessao, AsycTime } from "@/Utils";

export default {
  name: 'TarefaListaView',

  data: () => ({
    user: undefined,
    listaTarefas: [],
    mensagem: {
      show: false,
      tipo: 'sucesso',
      texto: ''
    },
  }),

  methods: {
    deletar(idTask) {
      if (this.user) {
        const idUser = this.user.id;

        ApiTask.usuario.tarefas.delete(idUser, idTask)
          .then(response =>{
            
            this.setMensagem('Deletado com sucesso!', 'sucesso', true);
            this.getLista();
            
          })
          .catch(error => console.error(error.message));
      }
    },

    getLista() {

      if (this.user) {
        ApiTask.usuario.tarefas.getAll(this.user.id)
          .then(response => {
            this.listaTarefas = response.data;
            if(this.listaTarefas.length == 0) this.setMensagem('Lista está vazia!', 'info', false);
          })
          .catch(error => console.error(error.message));
      };
      
    },

    setMensagem(texto, tipo, time){
      window.location.href = '#top';
      this.mensagem = { show: true, tipo, texto };
      
      if(time){
        AsycTime(false, 3000).then(response => {
          this.mensagem.show = response;
        });
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
