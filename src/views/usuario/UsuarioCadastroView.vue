<template>
  <div>
    <FormUsuarioComponent
      :usuario="usuario" 
      :mensagem="mensagem" 
      operacao="cadastro"
      @cadastrar="cadastrar()"
    />
  </div>
</template>

<script>
import FormUsuarioComponent from '@/Components/Form/FormUsuarioComponent.vue';
import { ApiTask } from '@/Services/ApiTask';
import { AsycTime, Sessao, Storage } from '@/Utils';

export default {
    name: 'UsuarioCadastroView',
    
    data: ()=>({
      usuario: {
        nome: "",
        email: "",
        senha: "",
        roles: []
      },
      mensagem: {
        show: false,
        tipo: 'erro',
        texto: ''
      }
    }),
    
    components: { FormUsuarioComponent },

    methods:{
      cadastrar() {
      if (this.validacao()) {
        const id_user = Storage.id || Sessao.id;
        ApiTask.usuario.post(this.usuario)
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

      if (!this.usuario.nome)
        campo = 'nome';
      else if (!this.usuario.email)
        campo = 'e-mail';
      else if (!this.usuario.senha)
        campo = 'senha';
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
      this.usuario = {
        nome: "",
        email: "",
        senha: "",
        roles: []
      }
    },
  }
}
</script>
