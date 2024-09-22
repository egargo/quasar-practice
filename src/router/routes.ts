import { Cookies } from 'quasar';
import { RouteRecordRaw } from 'vue-router';

const authorizationToken: string = Cookies.get('Authorization');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/IndexPage.vue'),
        alias: '/login',
      }
    ],
    meta: { hideForAuth: true },
    beforeEnter: (to, _from, next) => {
      if (authorizationToken) {
        next({ name: 'me' });
      } else {
        next();
      }
    }
  },

  {
    path: '/me',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'me',
        component: () => import('pages/UserPage.vue'),
      }
    ],
    meta: { requiresAuth: true },
    beforeEnter: (to, _form, next) => {
      if (authorizationToken) {
        next();
      } else {
        next({ name: 'login' });
      }
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
