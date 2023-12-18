<template>
  <div class="container border rounded-3 bg-light p-3 mt-3 w-50">
    <form @submit.prevent="cadastrar()">

      <h3 class="text-center mb-4">Cadastro Tarefa</h3>
      <alert-component v-if="mensagem.show" :tipo="mensagem.tipo" :texto="mensagem.texto"/>
      
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
          if(this.validacao()){
            const id_user = Storage.id || Sessao.id;
            ApiTask.usuario.tarefas.post(id_user, this.tarefa)
                .then(response => {
                  this.mensagemShow('Cadastrado com sucesso!', 'sucesso');
                  this.limparCampos();
                })
                .catch(error => {
                  console.error(error.message);
                  this.mensagemErro('Erro inesperado tente novamente mais tarde!', 'erro');
                });
          }  
        },
        validacao() {
          let campo = '';

          if (!this.tarefa.titulo)
            campo = 'Título';
          else if (!this.tarefa.descricao)
            campo = 'Descrição';
          else if (!this.tarefa.data)
            campo = 'Data';
          else if (this.tarefa.horarioInicio === '00:00')
            campo = 'Horário Inicial';
          else if (this.tarefa.horarioFim === '00:00')
            campo = 'Horário Final';
          
          if(campo) {
            this.mensagemShow(`Campo ${campo} não foi preenchido`, 'erro');
            return false;
          }
          
          return true

        },

        mensagemShow(texto, tipo){
          this.mensagem = {
            show: true,
            tipo,
            texto
          };
          AsycTime(false, 3000).then( response => this.mensagem.show = response);
        },
        limparCampos(){
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
