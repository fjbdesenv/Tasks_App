<template>
  <div class="container d-flex flex-column justify-content-center">

    <AlertComponentVue v-if="mensagem.show" :tipo="mensagem.tipo" :texto="mensagem.texto" />
    
    <form class="bg-light border rounded-3 p-5 w-80" @submit.prevent="cadastrar()">

      <h3 class="text-center mb-2">Cadastro</h3>

      <div class="row">
        <div class="col mb-3">
          <label for="nome" class="form-label">Nome</label>
          <input type="text" v-model="usuario.nome" name="nome" class="form-control"
            placeholder="Digite o seu nome completo">
        </div>
      </div>

      <div class="row">
        <div class="col mb-3">
          <label for="email" class="form-label">E-mail</label>
          <input type="email" v-model="usuario.email" name="email" class="form-control" placeholder="Digite seu email">
        </div>
      </div>

      <div class="row">
        <div class="col-6 mb-3">
          <label for="senha" class="form-label">Senha</label>
          <input type="password" v-model="usuario.senha" name="senha" autocomplete="off" class="form-control"
            placeholder="Digite a senha">
        </div>


        <div class="col-6 mb-3">
          <label for="senha-confirmacao" class="form-label">Confirmar senha</label>
          <input type="password" v-model="usuario.senhaConfirmacao" name="senha-confirmacao" autocomplete="off"
            class="form-control" placeholder="Digite a senha">
        </div>
      </div>

      <div class="row">
        <div class="col d-flex justify-content-around mt-3 ">
          <button class="btn btn-success"> Cadastrar </button>
          <router-link to="/login/login">
            <button class="btn btn-danger"> Voltar </button>
          </router-link>
        </div>
      </div>

    </form>
  </div>
</template>

<script>
import AlertComponentVue from '@/Components/AlertComponent.vue';
import { ApiTask } from "@/Services/ApiTask";
import { AsycTime } from '@/Utils';

export default {
  name: 'RegisterView',

  data: () => ({
    usuario: {
      nome: '',
      email: '',
      senha: '',
      senhaConfirmacao: ''
    },
    mensagem: {
      show: false,
      tipo: '',
      texto: ''
    },
  }),

  components: {
    AlertComponentVue
  },

  methods: {

    cadastrar() {
      if (this.validacao()) {
        ApiTask.usuario.post({
          nome: this.usuario.nome,
          email: this.usuario.email,
          senha: this.usuario.senha,
          roles: ['ROLE_USER']
        }).then(response => {
          this.limparCampos();
          this.showMessage('Usuário cadastrado com sucesso!', 'sucesso');
        }).catch(error => {
          console.error(error.message);
          this.showMessage('Ocorreu algum erro ao cadastrar o registro, por favor tente novamente mais tarde.', 'erro');
        });
      }
    },

    validacao() {
      let campo = '';
      if (!this.usuario.nome) campo = 'Nome';
      else if (!this.usuario.email) campo = 'Email';
      else if (!this.usuario.senha) campo = 'Senha';
      else if (!this.usuario.senhaConfirmacao) campo = 'Confirmação de senha';

      if (campo) {
        this.showMessage(`${campo} deve ser preenchido!`, 'erro');
        return false;
      }

      if (this.usuario.senha !== this.usuario.senhaConfirmacao) {
        this.showMessage('Senha e confirmação são diferentes!', 'erro');
        return false;
      }

      return true;
    },

    async showMessage(texto, tipo) {
      this.mensagem = { show: true, tipo, texto };
      this.mensagem.show = await AsycTime(false);
    },
    
    limparCampos() {
      this.usuario = {
        nome: '',
        email: '',
        senha: '',
        senhaConfirmacao: ''
      }
    },

  }

}
</script>
