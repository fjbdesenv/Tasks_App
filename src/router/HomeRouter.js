import HomeLayout from "../Layouts/HomeLayout.vue"
import NotFoundView from "../Views/NotFoundView.vue"

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
      component: HomeLayout,
      redirect: () => "/login",
      
      children: [
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
