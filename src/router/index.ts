import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - Nokroner` : 'Nokroner'
  next()
})

router.beforeEach((to) => {
  // Redirect to login if user isn't logged in
  const authPages = ['/login', '/register']
  const auth = useAuthStore()
  const isAuthPage = authPages.includes(to.path)

  if (!auth.isAuthenticated && !isAuthPage) {
    return { name: 'login', query: { returnUrl: to.path } }
  }

  // Alternatively, return to original pages when authenticated
  if (auth.isAuthenticated && isAuthPage) {
    const returnUrl = to.query.returnUrl?.toString() ?? '/overview'
    return { path: returnUrl }
  }
})

export default router
