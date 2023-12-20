<template>
  <div class="container">

    <Router-link to="/usuarios/cadastro" v-if="autenticado">
      <button class="btn btn-success mt-3"> Novo usuário </button>
    </Router-link>
    
    <AlertComponent 
      v-if="mensagem.show" 
      :tipo="mensagem.tipo" 
      :texto="mensagem.texto"
    />

    <table v-if="autenticado" class="table table-hover border mt-3 border">
      <thead>
        <tr>
          <th scope="col">Código</th>
          <th scope="col">Nome</th>
          <th scope="col">Email</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(usuario, index) in listaUsuarios" :key="index">
          <td>{{ usuario._id }}</td>
          <td>{{ usuario.nome }}</td>
          <td>{{ usuario.email }}</td>
          <td>
            <button class="btn btn-primary mx-2"> Editar </button>
            <button class="btn btn-danger  mx-2" @click="deletar(usuario._id)"> Deletar </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AlertComponent from '@/Components/AlertComponent.vue';
import { ApiTask } from '@/Services/ApiTask';
import { AsycTime, Sessao, Storage } from '@/Utils';

export default {
  name: 'UsuarioListaView',
  
  data: () => ({
      user: undefined,
      autenticado: false,
      listaUsuarios: [],
      mensagem: {
        show: false,
        tipo: 'erro',
        texto: ''
      }
  }),
  components:{
    AlertComponent
  },

  methods: {
      getLista() {
        ApiTask.usuario.getAll()
          .then(response =>{
            this.listaUsuarios = response.data
          })
          .catch(error =>{
            console.error(error.message);
            this.showMessage('Erro inesperado tente novamente mais tarde!', 'erro');
          }); 
      },

      deletar(idUser) {
        const confirmacao = confirm(`Deseja deletar o usuário de código ${idUser}?`);
        
        if(confirmacao){
          ApiTask.usuario.delete(idUser)
            .then(response =>{   
              this.showMessage('Deletado com sucesso!', 'sucesso');
              this.getLista();
            })
            .catch(error =>{
              console.error(error.message);
              this.showMessage('Erro inesperado tente novamente mais tarde!', 'erro');
            });
        };

      },
        

      async showMessage(texto, tipo) {
        this.mensagem = { show: true, tipo, texto };
        this.mensagem.show = await AsycTime(false);
      },
  },
  
  beforeMount() {
      this.user = Storage.user || Sessao.user;
      if (this.user) {
          this.autenticado = this.user.roles.includes('ROLE_ADM');
          if (!this.autenticado){
            this.mensagem = { show: true, tipo:'info', texto:'Credênciais insuficientes para acesso!' };
          }else{
            this.getLista();
          }
      }
  }
}
</script>
