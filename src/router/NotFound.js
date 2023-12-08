const notFoundRouters = {
  routers:[
    {
      path: "/:pathMatch(.*)*",
      redirect: () => "/home/notFound",
    }
  ],

  titles: {

  }
};

export { notFoundRouters };
