import { useAuthStore } from '@/stores/auth'
import axios, { type AxiosResponse } from 'axios'
import { useRoute, useRouter } from 'vue-router'

const host = import.meta.env.VITE_NOKRONER_API_HOST
const port = import.meta.env.VITE_NOKRONER_API_PORT
export const BASE_URL = `${host}:${port}`

const api = axios.create({
  baseURL: BASE_URL,
})

api.interceptors.request.use((request) => {
  const auth = useAuthStore()

  if (auth.token && auth.token !== '') {
    request.headers.Authorization = `Bearer ${auth.token}`
  }

  return request
})

api.interceptors.response.use(
  function onSuccess(response) {
    const auth = useAuthStore()

    // Update the token
    if (response.headers['authorization']) {
      const newToken = response.headers['authorization'].split(' ')[1]
      auth.setToken(newToken)
    }

    return response
  },
  async function onFailure(response: AxiosResponse) {
    const route = useRoute()
    const router = useRouter()
    const auth = useAuthStore()

    // Log out if the session has become invalid
    if (response.status === 401 && auth.isAuthenticated) {
      await auth.logout()
      router.push({
        name: 'login',
        query: { returnUrl: route.path },
      })
    }

    return Promise.reject(response)
  },
)

export default api
