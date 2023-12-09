import DefaultLayout from "../Layouts/DefaultLayout.vue"
import NotFoundView from "../Views/NotFoundView.vue"
import HomeView from "../Views/HomeView.vue"

const HomeRouter = {

  routers: [
    {
      path: "/",
      name: "Source",
      redirect: () => "/login",
    },
    {
      path: "/home",
      name: "Home",
      component: DefaultLayout,
      redirect: () => "/home/home",
      
      children: [
        {
          path: 'home',
          name: 'Home',
          component: HomeView
        },
        {
          path: 'notFound',
          name: 'NotFound',
          component: NotFoundView
        }
      ]
    },
  ],
  
  titles: {
    "Home": "Home",
    "NotFound": "Pagina não Encontrada"
  }
  
};

export { HomeRouter };
