import DefaultLayout from "../layouts/DefaultLayout.vue";
import TarefaListaView from "../views/tarefa/TarefaListaView.vue";
import TarefaCadastroView from "../views/tarefa/TarefaCadastroView.vue";
import TarefaEdicaoView from "../views/tarefa/TarefaEdicaoView.vue";

const tarefaRoutes = {
  routers: [
    {
      path: "/tarefas",
      name: "tarefas",
      redirect: () => "/tarefas/lista",
      component: DefaultLayout,
  
      children: [
        {
          path: "lista",
          name: "tarefaLista",
          component: TarefaListaView,
        },
        {
          path: "cadastro",
          name: "tarefaCadastro",
          component: TarefaCadastroView,
        },
        {
          path: "edicao/:id",
          name: "tarefaEdicao",
          component: TarefaEdicaoView,
        },
      ],
    },
  ],

  titles:{
    "tarefaLista":"Lista Tarefas",
    "tarefaCadastro":"Cadastro de Tarefa",
    "tarefaEdicao":"Edição de Tarefa",
  }
};

export { tarefaRoutes };
