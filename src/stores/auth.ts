import api from '@/services/axios'
import axios from 'axios'
import { defineStore } from 'pinia'

const API_SESSION = 'apiSession'
const API_ACCESS_TOKEN = 'apiAccessToken'

export interface LoginData {
  email_address: string
  password: string
}

export interface RegistrationData {
  first_name: string
  last_name: string
  email_address: string
  password: string
  password_confirmation: string
}

export const apiRoute = (route: string) => {
  if (!route.startsWith('/')) {
    route = `/${route}`
  }

  const host = import.meta.env.VITE_NOKRONER_API_HOST
  const port = import.meta.env.VITE_NOKRONER_API_PORT

  const path = `${host}:${port}${route}`
  return path
}

export const useAuthStore = defineStore('authentication', {
  state: () => ({
    session: localStorage.getItem(API_SESSION) || '',
    token: localStorage.getItem(API_ACCESS_TOKEN) || '',
    user: null,
    error: '',
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async register(data: RegistrationData) {
      // Start new request
      this.loading = true
      this.error = ''

      try {
        // Attempt to create a new user
        await api.post(
          apiRoute('/registration'),
          { user: data },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        // Log in to the new user, *should* never fail
        return this.login(data)
      } catch (err: unknown) {
        // Handle failed authentication
        if (axios.isAxiosError(err)) {
          this.error =
            err.response?.data?.error || err.message || 'Login failed'
        } else {
          this.error = 'Login failed'
        }
      } finally {
        this.loading = false
      }

      // User registration failed if we get here
      return false
    },

    async login(data: LoginData) {
      // Start new request
      this.loading = true
      this.error = ''

      try {
        // Attempt to create a new session
        const response = await api.post(apiRoute('/sessions'), data)

        // Save the session information to the state
        this.session = response.data.id
        this.token = response.data.token

        // Save the state for persistence
        localStorage.setItem(API_SESSION, this.session)
        localStorage.setItem(API_ACCESS_TOKEN, this.token)
      } catch (err: unknown) {
        // Handle failed authentication
        if (axios.isAxiosError(err)) {
          this.error =
            err.response?.data?.error || err.message || 'Login failed'
        } else {
          this.error = 'Login failed'
        }
      } finally {
        // End request
        this.loading = false
      }

      // Return true if successfully logged in, otherwise false
      return this.error === ''
    },

    logout() {
      // Delete the session API token
      api.delete(apiRoute(`/session/${this.session}`))

      // Clear out the state
      this.token = ''
      this.session = ''

      // Delete the stored state
      localStorage.removeItem(API_SESSION)
      localStorage.removeItem(API_ACCESS_TOKEN)

      // Refresh the page to allow the router to redirect us to login
      if (window) {
        window.location.reload()
      }
    },

    setToken(token: string) {
      this.token = token
      localStorage.setItem(API_ACCESS_TOKEN, token)
    },
  },
})
