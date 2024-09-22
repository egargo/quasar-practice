import { RouteRecordRaw } from 'vue-router';

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
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
