import DefaultLayout from "../Layouts/DefaultLayout.vue";
import TarefaListaView from "../Views/Tarefa/TarefaListaView.vue";
import TarefaCadastroView from "../Views/Tarefa/TarefaCadastroView.vue";
import TarefaEdicaoView from "../Views/Tarefa/TarefaEdicaoView.vue";

const TarefaRouter = {
  routers: [
    {
      path: "/tarefas",
      name: "tarefas",
      redirect: () => "/tarefas/lista",
      component: DefaultLayout,
  
      children: [
        {
          path: "lista",
          name: "TarefaLista",
          component: TarefaListaView,
        },
        {
          path: "cadastro",
          name: "TarefaCadastro",
          component: TarefaCadastroView,
        },
        {
          path: "edicao/:id",
          name: "TarefaEdicao",
          component: TarefaEdicaoView,
        },
      ],
    },
  ],

  titles:{
    "TarefaLista":"Lista Tarefas",
    "TarefaCadastro":"Cadastro de Tarefa",
    "TarefaEdicao":"Edição de Tarefa",
  }
};

export { TarefaRouter };
