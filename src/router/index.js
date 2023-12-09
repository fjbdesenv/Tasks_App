import { createRouter, createWebHistory } from 'vue-router'
import { HomeRouter } from './HomeRouter'
import { LoginRouter } from './LoginRouter'
import { NotFoundRouter } from './NotFoundRouter'
import { TarefaRouter } from './TarefaRouter'
import { UsuarioRouter } from './UsuarioRouter'

const routes = [
  ...HomeRouter.routers,
  ...LoginRouter.routers,
  ...UsuarioRouter.routers,
  ...TarefaRouter.routers,
  ...UsuarioRouter.routers,
  ...NotFoundRouter.routers
]

const PAGE_TITLE = {
  ...HomeRouter.titles,
  ...LoginRouter.titles,
  ...UsuarioRouter.titles,
  ...TarefaRouter.titles,
  ...NotFoundRouter.titles
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((toRoute) => {
  window.document.title = PAGE_TITLE[toRoute.name]
})


export default router
