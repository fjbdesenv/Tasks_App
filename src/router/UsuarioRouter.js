import DefaultLayout from "../Layouts/DefaultLayout.vue";
import UsuarioListaView from "../Views/Usuario/UsuarioListaView.vue";
import UsuarioCadastroView from "../Views/Usuario/UsuarioCadastroView.vue";
import UsuarioEdicaoView from "../Views/Usuario/UsuarioEdicaoView.vue";

const UsuarioRouter = {
  routers: [
    {
      path: "/usuarios",
      name: "usuarios",
      redirect: () => "/usuarios/lista",
      component: DefaultLayout,
  
      children: [
        {
          path: "lista",
          name: "UsuarioLista",
          component: UsuarioListaView,
        },
        {
          path: "cadastro",
          name: "UsuarioCadastro",
          component: UsuarioCadastroView,
        },
        {
          path: "edicao/:id",
          name: "UsuarioEdicao",
          component: UsuarioEdicaoView,
        },
      ],
    },
  ],

  titles:{
    "UsuarioLista":"Lista Usuário",
    "UsuarioCadastro":"Cadastro de Usuário",
    "UsuarioEdicao":"Edição de Usuário",
  }
};

export { UsuarioRouter };
