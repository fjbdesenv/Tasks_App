import { createRouter, createWebHistory } from 'vue-router'
import { homeRouters } from './home'
import { loginRoutes } from './login'
import { notFoundRouters } from './NotFound'
import { tarefaRoutes } from './tarefas'
import { usuarioRoutes } from './usuarios'

const routes = [
  ...homeRouters.routers,
  ...loginRoutes.routers,
  ...usuarioRoutes.routers,
  ...tarefaRoutes.routers,
  ...notFoundRouters.routers
]

const PAGE_TITLE = {
  ...homeRouters.titles,
  ...loginRoutes.titles,
  ...usuarioRoutes.titles,
  ...tarefaRoutes.titles,
  ...notFoundRouters.titles
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((toRoute) => {
  window.document.title = PAGE_TITLE[toRoute.name]
})


export default router
