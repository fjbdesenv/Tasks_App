<template>
    <div>
    <div class="container">
      <AlertComponent v-if="mensagem.show" :tipo="mensagem.tipo" :texto="mensagem.texto" />
    </div>

    <div class="container border rounded-3 bg-light p-3 mt-3 w-50">

      <form @submit.prevent="acao()">

        <h3 class="text-center mb-4">{{ textoOperacao }} Tarefa</h3>

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
          
        <div v-if="operacao === 'edicao'" class="input-group mb-3">
          <span class="input-group-text"> Status </span>
          <select v-model="tarefa.status" class="form-select">
            <option :value="0" disabled> Selecione uma opção </option>
            <option :value="1"> Não iniciada </option>
            <option :value="2"> Em execução </option>
            <option :value="3"> Finalizada </option>
          </select>
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
          <button class="btn btn-success m-2"> {{ textoOperacao }} </button>
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

export default {
  name: 'FormTarefaComponent',
  
  props:{   
    tarefa:{
      type: Object,
      required: true
    }, 
    mensagem:{
      type: Object,
      required: true
    },
    operacao: {
      type: String,
      required: true,
      validator(value){
        return (value == 'cadastro' || value == 'edicao') 
      }
    }
  },
  
  components: { 
    AlertComponent, 
  },
  
  computed: {
    textoOperacao(){
      if(this.operacao === "cadastro") return "Cadastrar";
      else if(this.operacao === "edicao") return "Editar";
    }  
  },

  methods:{
    acao(){
      if(this.operacao === "cadastro") this.$emit('cadastrar');
      else if(this.operacao === "edicao") this.$emit('edicao');
    }
  }
};
</script>