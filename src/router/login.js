import HomeLayout from "../layouts/HomeLayout.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";

const loginRoutes = {
  
  routers: [
    {
      path: "/login/",
      name: "homelogin",
      redirect: () => "/login/login",
      component: HomeLayout,
  
      children: [
        {
          path: "login",
          name: "login",
          component: LoginView,
        },
        {
          path: "register",
          name: "register",
          component: RegisterView,
        },
      ],
    },
  ],

  titles: {
    "login": "Login",
    "register": "Cadastro"
  }
  
};

export { loginRoutes };
