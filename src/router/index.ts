import { createRouter, createWebHistory } from 'vue-router';

import ShowListView from '@/views/ShowsList.vue';
import ShowDetail from '@/views/ShowDetail.vue';

const routes = [
  { path: '/show/:id', component: ShowDetail },
  { path: '/', component: ShowListView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
