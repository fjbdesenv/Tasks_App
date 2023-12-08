import DefaultLayout from "../layouts/DefaultLayout.vue";
import UsuarioListaView from "../views/usuario/UsuarioListaView.vue";
import UsuarioCadastroView from "../views/usuario/UsuarioCadastroView.vue";
import UsuarioEdicaoView from "../views/usuario/UsuarioEdicaoView.vue";

const usuarioRoutes = {
  routers: [
    {
      path: "/usuarios",
      name: "usuarios",
      redirect: () => "/usuarios/lista",
      component: DefaultLayout,
  
      children: [
        {
          path: "lista",
          name: "usuarioLista",
          component: UsuarioListaView,
        },
        {
          path: "cadastro",
          name: "usuarioCadastro",
          component: UsuarioCadastroView,
        },
        {
          path: "edicao/:id",
          name: "usuarioEdicao",
          component: UsuarioEdicaoView,
        },
      ],
    },
  ],

  titles:{
    "usuarioLista":"Lista Usuário",
    "usuarioCadastro":"Cadastro de Usuário",
    "usuarioEdicao":"Edição de Usuário",
  }
};

export { usuarioRoutes };
