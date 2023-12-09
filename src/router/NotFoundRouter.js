const NotFoundRouter = {
  routers:[
    {
      path: "/:pathMatch(.*)*",
      redirect: () => "/home/notFound",
    }
  ],

  titles: {

  }
};

export { NotFoundRouter };
