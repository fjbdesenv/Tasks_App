<template>
  <div>
    <div class="container">
      <AlertComponent v-if="mensagem.show" :tipo="mensagem.tipo" :texto="mensagem.texto" />
    </div>

    <div v-if="autenticado" class="container border rounded-3 bg-light p-3 mt-3 w-50">

      <form @submit.prevent="acao()">

        <h3 class="text-center mb-4">{{ textoOperacao }} Usuário</h3>

        <div class="input-group mb-3">
          <span class="input-group-text">Nome</span>
          <input v-model="usuario.nome" type="text" aria-label="Titlo" class="form-control">
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">E-mail</span>
          <input v-model="usuario.email" type="text" aria-label="Titlo" class="form-control">
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Senha</span>
          <input v-model="usuario.senha" type="text" autocomplete="off" aria-label="horario inicial" class="form-control">
        </div>
        
        <div class="container mb-3">
          <div class="form-check">
            <input v-model="roles.user" class="form-check-input" type="checkbox" id="checkRoleUser">
            <label class="form-check-label" for="checkRoleUser">
              Usuário
            </label>
          </div>
          <div class="form-check">
            <input v-model="roles.adm" class="form-check-input" type="checkbox" id="checkRoleAdm">
            <label class="form-check-label" for="checkRoleAdm">
              Administrador
            </label>
          </div>
        </div>

        <div class="mb-3">
          <button class="btn btn-success m-2"> {{ textoOperacao }} </button>
          <router-link to="/usuarios/lista">
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
  name: 'FormUsuarioComponent',

  data: () => ({
    roles: {
      user: false,
      adm: false
    }
  }),

  props: {
    usuario: {
      type: Object,
      required: true
    },
    mensagem: {
      type: Object,
      required: true
    },
    operacao: {
      type: String,
      required: true,
      validator(value) {
        return (value == 'cadastro' || value == 'edicao')
      }
    },
    autenticado:{
      type: Boolean,
      default: false
    }
  },

  components: {
    AlertComponent,
  },

  computed: {
    textoOperacao() {
      if (this.operacao === "cadastro") return "Cadastrar";
      else if (this.operacao === "edicao") return "Editar";
    }
  },

  methods: {
    acao() {
      if (this.usuario) {
        this.usuario.roles = [];
        if (this.roles.user) this.usuario.roles.push('ROLE_USER');
        if (this.roles.adm) this.usuario.roles.push('ROLE_ADM');
      }

      if (this.operacao === "cadastro") this.$emit('cadastrar');
      else if (this.operacao === "edicao") this.$emit('edicao');
    },

    checkRoles(){
      if (this.usuario.roles.includes('ROLE_USER')) this.roles.user = true;
      if (this.usuario.roles.includes('ROLE_ADM')) this.roles.adm = true;
    }
  },

  watch:{
    usuario(){
      this.checkRoles();
    }
  },

  beforeMount() {
    if (this.usuario) this.checkRoles();
  }
};
</script>