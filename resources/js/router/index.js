import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ParticularNews from '../views/particularNews.vue'
import CategoryNews from '../views/categoryNews.vue'
import LatestNews from '../views/latestNews.vue'
import TopHeadlineNews from '../views/topHeadlineNews.vue'
import SearchNews from '../views/searchNews.vue'

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
  {
    path: '/category/:category',
    name: 'categoryNews',
    component: CategoryNews,
    props: true
  },
  {
    path: '/latest-news',
    name: 'latestNews',
    component: LatestNews
  },
  {
    path: '/top-headline',
    name: 'topHeadlineNews',
    component: TopHeadlineNews
  },
  {
    path: '/search/:search',
    name: 'searchNews',
    component: SearchNews,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ top: 0, behavior: 'smooth' });
        }, 400);
    });
  }
});

export default router
