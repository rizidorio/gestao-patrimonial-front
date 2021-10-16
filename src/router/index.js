import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthRoutes from "../views/Auth/routes";

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
    }
  ]
});

export default router;
