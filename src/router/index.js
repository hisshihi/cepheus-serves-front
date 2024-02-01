import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

import { jwtDecode } from "jwt-decode";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/basket",
    name: "basket",
    component: () =>
      import(/* webpackChunkName: "basket" */ "../views/BasketView.vue"),
    meta: { requiresAuth: true }, // Укажите, что требуется авторизация
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/RegisterView.vue"),
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token')
        if (token) {
          next({path: '/'});
        } else next();
      }
  },
  {
    path: "/authenticate",
    name: "authenticate",
    component: () => import(/* webpackChunkName: "authenticate" */ "../views/AuthenticateVuew.vue"),
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token')
      if (token) {
        next({path: '/'});
      } else next();
    }
  },
  {
    path: "/admin",
    name: "admin",
    component: () =>
      import(/* webpackChunkName: "basket" */ "../views/AdminView.vue"),
    meta: { 
      requiresAuth: true,

     }, // Укажите, что требуется авторизация
     beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token')
      const tokenDecoder = jwtDecode(token);
      const role = tokenDecoder.aud
      if (role != "[ADMIN]") {
        next({path: '/'});
      } else next();
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (token) {
    const tokenDecoder = jwtDecode(token);
    console.log(tokenDecoder.aud);
    if (tokenDecoder.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
    }
  }

  if (to.meta.requiresAuth && !token) {
    next({
      path: "/authenticate",
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});
