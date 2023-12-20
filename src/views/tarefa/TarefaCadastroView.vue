<template>
  <FormTarefaComponent 
    :tarefa="tarefa" 
    :mensagem="mensagem" 
    operacao="cadastro"
    @cadastrar="cadastrar()"
  />
</template>

<script>
import { ApiTask } from '@/Services/ApiTask';
import { AsycTime, Sessao, Storage } from '@/Utils';
import FormTarefaComponent from "@/Components/Form/FormTarefaComponent.vue";

export default {
  name: 'TarefaCadastroView',
  
  data: () => ({
    tarefa: {
      id_user: 0,
      titulo: "",
      descricao: "",
      status: 1,
      data: "",
      horarioInicio: "00:00",
      horarioFim: "00:00"
    },
    mensagem: {
      show: false,
      tipo: 'erro',
      texto: ''
    }
  }),
  
  components: {
    FormTarefaComponent
  },

  methods: {
    cadastrar() {
      if (this.validacao()) {
        const id_user = Storage.id || Sessao.id;
        ApiTask.usuario.tarefas.post(id_user, this.tarefa)
          .then(response => {
            this.showMessage('Cadastrado com sucesso!', 'sucesso');
            this.limparCampos();
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
      else if (this.tarefa.horarioInicio === '00:00')
        campo = 'horário Inicial';
      else if (this.tarefa.horarioFim === '00:00')
        campo = 'horário Final';
      else{
        this.tarefa.data = this.formatDate(this.tarefa.data);
        return true;
      };

      if (campo) {
        this.showMessage(`Campo ${campo} não foi preenchido`, 'erro');
        return false;
      }

    },

    async showMessage(texto, tipo) {
      this.mensagem = { show: true, tipo, texto };
      this.mensagem.show = await AsycTime(false);
    },
    
    limparCampos() {
      this.tarefa = {
        id_user: 0,
        titulo: "",
        descricao: "",
        status: 1,
        data: "",
        horarioInicio: "00:00",
        horarioFim: "00:00"
      }
    },
    
    formatDate(data){
      const aux = new Date(data.toString());
      return `${aux.getFullYear()}-${aux.getMonth()}-${aux.getDay()}`;
    }
  }
}
</script>
