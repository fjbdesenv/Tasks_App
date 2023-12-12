<template>
  <div class="container d-flex justify-content-center">

    <form class="bg-light border rounded-3 p-5 w-80">

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

export default {
  name: 'RegisterView',
  data: () => ({
    usuario: {
      nome: '',
      email: '',
      senha: '',
      senhaConfirmacao: ''
    }
  })
}
</script>
