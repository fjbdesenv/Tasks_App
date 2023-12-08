import HomeLayout from "../layouts/HomeLayout.vue"
import NotFoundView from "../views/NotFoundView.vue"

const homeRouters = {

  routers: [
    {
      path: "/",
      name: "source",
      redirect: () => "/login",
    },
    {
      path: "/home",
      name: "home",
      component: HomeLayout,
      redirect: () => "/login",
      
      children: [
        {
          path: 'notFound',
          name: 'notFound',
          component: NotFoundView
        }
      ]
    },
  ],
  
  titles: {
    "home": "Home",
    "notFound": "Pagina não Encontrada"
  }
  
};

export { homeRouters };
