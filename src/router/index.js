import { createRouter, createWebHistory } from 'vue-router'
import IntroductionView from '../views/IntroductionView.vue'
import AuroraView from '../views/AuroraView.vue'
import ActivityView from '../views/ActivityView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'introduction',
      component: IntroductionView,
    },
    {
      path: '/aurora',
      name: 'aurora',
      component: AuroraView,
    },
    {
      path: '/activity',
      name: 'activity',
      component: ActivityView,
    },
  ],
})

export default router