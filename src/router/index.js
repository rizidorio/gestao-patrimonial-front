import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthRoutes from "../views/Auth/router";
import ConfigurationRoutes from "../views/Configuration/router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes : [
    {
      path: "/",
      redirect: "/auth"
    },
    {
      path: "/auth",
      ...AuthRoutes,
    },
    {
      path: "/configurations",
      ...ConfigurationRoutes,
    }
  ]
});

export default router;
