<template>
  <div class="container">

    <AlertComponent tipo="erro" texto="Email ou senha incorretos!" v-if="erro.status === 401" />
    <AlertComponent tipo="erro" texto="Erro inesperado tente novamente mais tarde!" v-if="erro.status === 500" />

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
    </form>

  </div>
</template>

<script>
import { ApiTask } from '@/Services/ApiTask';
import AlertComponent from '@/Components/AlertComponent.vue';
import { localGet } from "../Utils"

export default {
  name: 'LoginView',
  data: () => ({
    email: '',
    password: '',
    manterConectado: true,
    erro: {
      status: 0
    }
  }),
  methods: {

    logar() {

      // Faz autenticação
      ApiTask.auth({ email: this.email, senha: this.password })
        .then((response) => {
          try {
            let token = response.data.token;

            this.setToken(token);
            this.redirecionarHome();

          } catch (error) { throw error };

        })
        .catch((error) => {

          if (error.request && error.request.status == 401) {
            // Erro de autenticação
            this.messageErro(401);
          } else {
            // Erro no servidor de autenticação
            this.messageErro(500);
          }

        })
    },

    setToken(token) {
      if (this.manterConectado) {
        // Salva token no localStorege
        localStorage.setItem('token', token);
      } else {
        // Salva token na sessionStorage
        localStorage.removeItem('token');
        sessionStorage.setItem('token', token);
      }
    },

    redirecionarHome(){
      window.location.href = '/home/home';
    },

    messageErro(statusCode) {

      this.erro.status = statusCode;

      setTimeout(() => {
        // Mostrar mensagem de erro por alguns segundos
        this.erro.status = 0;
      }, 5000)

    },

  },

  components: {
    AlertComponent
  },

  beforeMount(){
    let token = localGet('token');
    if(token){
      this.setToken(token);
      this.redirecionarHome();
    }
  }
}
</script>
