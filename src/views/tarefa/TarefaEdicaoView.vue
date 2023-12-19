<template>
  <FormTarefaComponent 
    :tarefa="tarefa" 
    :mensagem="mensagem" 
    operacao="edicao"
    @edicao="edicao()"
  />
</template>

<script>
import { ApiTask } from '@/Services/ApiTask';
import { AsycTime, Sessao, Storage } from '@/Utils';
import FormTarefaComponent from "@/Components/Form/FormTarefaComponent.vue";

export default {
  name: 'TarefaEdicaoView',

  data: () => ({
    tarefa: {
      _id: 0,
      id_user: 0,
      titulo: "",
      descricao: "",
      status: 0,
      data: "",
      horarioInicio: "00:00",
      horarioFim: "00:00"
    },
    mensagem: {
      show: false,
      tipo: 'erro',
      texto: ''
    },
    idUser: 0,
  }),

  components: {
    FormTarefaComponent
  },

  methods: {
    edicao() {
      if (this.validacao()) {
        const idUser = this.idUser;
        const idTask = this.tarefa._id;

        ApiTask.usuario.tarefas.put(idUser, idTask, this.tarefa)
          .then(response => {
            this.showMessage('Editado com sucesso!', 'sucesso');
          })
          .catch(error => {
            console.error(error.message);
            this.showMessage('Erro inesperado tente novamente mais tarde!', 'erro');
          });
      }
    },

    validacao() {
      let campo = '';

      if (!this.tarefa.titulo)
        campo = 'título';
      else if (!this.tarefa.descricao)
        campo = 'descrição';
      else if (!this.tarefa.data)
        campo = 'data';
      else if (this.tarefa.status === '0')
        campo = 'status';
      else if (this.tarefa.horarioInicio === '00:00')
        campo = 'horário Inicial';
      else if (this.tarefa.horarioFim === '00:00')
        campo = 'horário Final';
      else return true;

      if (campo) {
        this.showMessage(`Campo ${campo} não foi preenchido!`, 'erro');
        return false;
      }
    },

    async showMessage(texto, tipo) {
      this.mensagem = { show: true, tipo, texto };
      this.mensagem.show = await AsycTime(false);
    },

    getTarefa(){
      ApiTask.usuario.tarefas.getId(this.idUser ,this.tarefa._id)
        .then(response => {
          this.tarefa = response.data;
        })
        .catch(error => {
          console.error(error.message);
          this.showMessage('Erro inesperado tente novamente mais tarde!', 'erro');
        });
    }
  },

  beforeMount(){
    this.idUser = Storage.id || Sessao.id;
    this.tarefa._id = this.$route.params.id;
    this.getTarefa();
  }
}
</script>
