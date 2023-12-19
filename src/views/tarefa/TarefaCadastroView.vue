<template>
  <div>
    <div class="container">
      <alert-component v-if="mensagem.show" :tipo="mensagem.tipo" :texto="mensagem.texto" />
    </div>

    <div class="container border rounded-3 bg-light p-3 mt-3 w-50">

      <form @submit.prevent="cadastrar()">

        <h3 class="text-center mb-4">Cadastro Tarefa</h3>

        <div class="input-group mb-3">
          <span class="input-group-text">Título</span>
          <input v-model="tarefa.titulo" type="text" aria-label="Titlo" class="form-control">
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Descrição</span>
          <input v-model="tarefa.descricao" type="text" aria-label="Titlo" class="form-control">
        </div>


        <div class="input-group mb-3">
          <span class="input-group-text">Data</span>
          <input v-model="tarefa.data" type="date" aria-label="Data" class="form-control">
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Horário Inícial</span>
          <input v-model="tarefa.horarioInicio" type="time" aria-label="horario inicial" class="form-control">
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Horário Final</span>
          <input v-model="tarefa.horarioFim" type="time" aria-label="horario final" class="form-control">
        </div>

        <div>
          <button class="btn btn-success m-2"> Cadastrar </button>
          <router-link to="/tarefas/lista">
            <button class="btn btn-danger m-2"> Voltar </button>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AlertComponent from '@/Components/AlertComponent.vue';
import { ApiTask } from '@/Services/ApiTask';
import { AsycTime, Sessao, Storage } from '@/Utils';

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
      else return true;

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
    }
  },
  components: { AlertComponent }
}
</script>
