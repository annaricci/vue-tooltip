import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Registration from "../views/Registration.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Registration",
    component: Registration
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;