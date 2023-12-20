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
      const confirmacao = confirm(`Deseja deletar a tarefa de código ${idTask}?`);
        
      if(confirmacao){
        if (this.user) {
          const idUser = this.user.id;
  
          ApiTask.usuario.tarefas.delete(idUser, idTask)
            .then(response =>{   
              this.showMessage('Deletado com sucesso!', 'sucesso');
              this.getLista();
            })
            .catch(error =>{
              console.error(error.message);
              this.showMessage('Erro inesperado tente novamente mais tarde!', 'erro');
            });
        }
      };

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

    async showMessage(texto, tipo) {
      window.location.href = '#top';
      this.mensagem = { show: true, tipo, texto };
      this.mensagem.show = await AsycTime(false);
    },
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
