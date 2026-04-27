import { createRouter, createWebHistory } from 'vue-router';

import ShowListView from '@/views/ShowsList.vue';
import ShowDetail from '@/views/ShowDetail.vue';
import SearchShow from '@/views/SearchShow.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
  { path: '/', component: ShowListView },
  { path: '/search', component: SearchShow },
  { path: '/show/:id', component: ShowDetail, props: true },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
