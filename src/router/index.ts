import { createRouter, createWebHistory } from 'vue-router';

const ShowListView = import('@/views/ShowsList.vue');
const ShowDetail = import('@/views/ShowDetail.vue');
const SearchShow = import('@/views/SearchShow.vue');
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
  scrollBehavior: () => ({ top: 0 }),
});
