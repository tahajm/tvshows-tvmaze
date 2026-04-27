import { createRouter, createWebHistory } from 'vue-router';

import ShowListView from '@/views/ShowsList.vue';
import ShowDetail from '@/views/ShowDetail.vue';
import SearchShow from '@/views/SearchShow.vue';

const routes = [
  { path: '/', component: ShowListView },
  { path: '/search', component: SearchShow },
  { path: '/show/:id', component: ShowDetail, props: true },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
