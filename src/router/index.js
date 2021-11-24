import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthRoutes from "../views/pages/Auth/router";
import ConfigurationRoutes from "../views/pages/Configuration/router";
import CompanyRoutes from "../views/pages/Company/router";

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
    },
    {
      path: "/companies",
      ...CompanyRoutes,
    }
  ]
});

export default router;
