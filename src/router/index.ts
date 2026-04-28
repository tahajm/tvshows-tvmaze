import { createRouter, createWebHistory } from 'vue-router';

import NotFound from '@/views/NotFound.vue';

const ShowsList = () => import('@/views/ShowsList.vue');
const ShowDetail = () => import('@/views/ShowDetail.vue');
const SearchShow = () => import('@/views/SearchShow.vue');

const routes = [
  { path: '/', component: ShowsList },
  { path: '/search', component: SearchShow },
  { path: '/show/:id(\\d+)', component: ShowDetail, props: true },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});
