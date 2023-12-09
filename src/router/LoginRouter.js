import HomeLayout from "../Layouts/HomeLayout.vue";
import LoginView from "../Views/LoginView.vue";
import RegisterView from "../Views/RegisterView.vue";

const LoginRouter = {
  
  routers: [
    {
      path: "/login/",
      name: "Homelogin",
      redirect: () => "/login/login",
      component: HomeLayout,
  
      children: [
        {
          path: "login",
          name: "Login",
          component: LoginView,
        },
        {
          path: "register",
          name: "Register",
          component: RegisterView,
        },
      ],
    },
  ],

  titles: {
    "Login": "Login",
    "Register": "Cadastro"
  }
  
};

export { LoginRouter };
