import { routes } from './routes'
import { createRouter, createWebHistory } from 'vue-router'
// import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  // const { isLogged } = storeToRefs(useUserStore())
  // if (!isLogged.value && to.name !== 'AuthPage') {
  //   return { name: 'AuthPage' }
  // } else if (isLogged.value && to.name === 'AuthPage') {
  //   return { name: 'TasksPage' }
  // }
  // return true
})

export default router
