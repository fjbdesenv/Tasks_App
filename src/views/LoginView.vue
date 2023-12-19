<template>
  <div class="container">

    <AlertComponent :tipo="mensagem.tipo" :texto="mensagem.texto" v-if="mensagem.show" />

    <form class="container border rounded-3 bg-light p-3 w-50">
      <h3 class="text-center mb-2">Login</h3>

      <div class="mb-3">
        <label class="form-label" for="email">Email</label>
        <input type="email" class="form-control" v-model="email">
      </div>

      <div class="mb-3">
        <label class="form-label" for="password">Senha</label>
        <input type="password" name="password" autocomplete="off" class="form-control" v-model="password">
      </div>

      <div class="my-3 form-check">
        <input type="checkbox" class="form-check-input" id="manterConectado" v-model="manterConectado">
        <label for="manterLogado"> Continuar conectado </label>
      </div>

      <button type="button" class="btn btn-primary my-2" @click="logar()">Logar</button>

      <p class="mt-3">
        Não tem conta? <router-link to="/login/register">Registrar-se</router-link>
      </p>
    </form>

  </div>
</template>

<script>
import { ApiTask } from '@/Services/ApiTask';
import AlertComponent from '@/Components/AlertComponent.vue';
import { Sessao, Storage, Redirect, AsycTime } from "../Utils"

export default {
  name: 'LoginView',
  data: () => ({
    email: '',
    password: '',
    manterConectado: true,
    mensagem: {
      tipo: 'erro',
      show: false,
      texto: ''
    }
  }),
  methods: {

    logar() {

      // Faz autenticação
      ApiTask.auth({ email: this.email, senha: this.password })
        .then((response) => {
          try {
            let user_data = response.data;

            this.setUser(user_data);
            Redirect.home();

          } catch (error) { throw error };
        })
        .catch((error) => {
          console.log(error.message);
          error.request && error.request.status == 401 ? 
            this.messageErro(401)
            : this.messageErro(500);
        })
    },

    setUser(user_data) {
      if (this.manterConectado) {
        Sessao.clear();
        Storage.user = user_data;
      } else {
        Storage.clear();
        Sessao.user = user_data;
      }
    },

    messageErro(statusCode) {
      if(statusCode == 401)  this.showMessage('Email ou senha incorretos!', 'erro')
      else if(statusCode == 500) this.showMessage('Erro inesperado tente novamente mais tarde!', 'erro');
    },

    async showMessage(texto, tipo) {
      this.mensagem = { show: true, tipo, texto };
      this.mensagem.show = await AsycTime(false);
    },
  },

  components: {
    AlertComponent
  },

  beforeMount(){
    if(Storage.user || Sessao.user) Redirect.home(); 
  }
}
</script>
