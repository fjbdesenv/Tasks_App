<template>
  <FormUsuarioComponent
    :autenticado="autenticado"
    :usuario="usuario" 
    :aux="usuario"
    :mensagem="mensagem" 
    operacao="edicao"
    @edicao="editar()"
  />
</template>

<script>
import FormUsuarioComponent from '@/Components/Form/FormUsuarioComponent.vue';
import { ApiTask } from '@/Services/ApiTask';
import { AsycTime, Sessao, Storage } from '@/Utils';

export default {
  name: 'UsuarioEdicaoView',

  data: ()=>({
    autenticado: false,
    usuario: {
      nome: "ss",
      email: "",
      senha: "",
      roles: []
    },
    mensagem: {
      show: false,
      tipo: 'erro',
      texto: ''
    },
  }),

  components: { FormUsuarioComponent },
  
  methods:{
    async showMessage(texto, tipo) {
      this.mensagem = { show: true, tipo, texto };
      this.mensagem.show = await AsycTime(false);
    },
    
    getUsuario(idUser){
      ApiTask.usuario.getId(idUser)
        .then(response => {
          this.usuario = response.data;
        })
        .catch(error => {
          console.error(error.message);
          this.showMessage('Erro inesperado tente novamente mais tarde!', 'erro');
        });
    },

    editar(){
      ApiTask.usuario.put(this.usuario._id, this.usuario)
        .then(response => {
          this.showMessage('Editado com sucesso!', 'sucesso');
        })
        .catch(error => {
          console.error(error.message);
          this.showMessage('Erro inesperado tente novamente mais tarde!', 'erro');
        });  
    }
  },

  beforeMount() {
    const user = Storage.user || Sessao.user;

    if (user) {
      this.autenticado = user.roles.includes('ROLE_ADM');
      
      if (!this.autenticado){
        this.mensagem = { show: true, tipo:'info', texto:'Credênciais insuficientes para acesso!' };
      }else{
        const idUser = this.$route.params.id;
        this.getUsuario(idUser);
      }

    }
  }
}
</script>
