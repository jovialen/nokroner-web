import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

const host = import.meta.env.VITE_NOKRONER_API_HOST
const port = import.meta.env.VITE_NOKRONER_API_PORT

const api = axios.create({
  baseURL: `${host}:${port}`,
})

api.interceptors.request.use((config) => {
  const auth = useAuthStore()

  if (auth.token && auth.token !== '') {
    config.headers.Authorization = `Bearer ${auth.token}`
  }

  return config
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
  function onFailure(response) {
    const auth = useAuthStore()

    // Log out if the session has become invalid
    if (response.status === 401 && auth.isAuthenticated) {
      auth.logout()
      window.location.href = `/login?returnUrl=${window.location.pathname}`;
    }

    return Promise.reject(response)
  },
)

export default api
