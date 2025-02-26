import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ParticularNews from '../views/particularNews.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/news/:id',
    name: 'particularNews',
    component: ParticularNews,
    props: true
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router
