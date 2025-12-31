import type { User } from '@/api/schemas'
import api from '@/services/axios'
import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref, watchEffect } from 'vue'

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

export const useAuthStore = defineStore('authentication', {
  state: () => ({
    session: localStorage.getItem(API_SESSION) || '',
    token: localStorage.getItem(API_ACCESS_TOKEN) || '',
    error: '',
    loading: false,
    loggingOut: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !state.loggingOut,
  },

  actions: {
    async register(data: RegistrationData) {
      // Start new request
      this.loading = true
      this.error = ''

      try {
        // Attempt to create a new user
        await api.post(
          '/registration',
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
            err.response?.data?.error || err.message || 'Registration failed'
        } else {
          this.error = 'Registration failed'
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
      this.loggingOut = true

      try {
        // Attempt to create a new session
        const response = await api.post('/sessions', data)

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
        this.loggingOut = false
      }

      // Return true if successfully logged in, otherwise false
      return this.error === ''
    },

    async logout() {
      this.loggingOut = true
      this.loading = true
      this.error = ''

      try {
        // Delete the session API token
        await api.delete(`/sessions/${this.session}`)
      } catch (err: unknown) {
        // Handle failed authentication
        if (axios.isAxiosError(err)) {
          this.error =
            err.response?.data?.error || err.message || 'Logout failed'
        } else {
          this.error = 'Logout failed'
        }
        console.error('Logout failed', this.error)
      } finally {
        // Clear out the state
        this.token = ''
        this.session = ''

        // Delete the stored state
        localStorage.removeItem(API_SESSION)
        localStorage.removeItem(API_ACCESS_TOKEN)

        // Finish the request
        this.loading = false
        this.loggingOut = false
      }
    },

    setToken(token: string) {
      this.token = token
      localStorage.setItem(API_ACCESS_TOKEN, token)
    },
  },
})

export const useUserStore = defineStore('user', () => {
  const auth = useAuthStore()
  const user = ref<User | undefined | null>()

  const full_name = computed(() =>
    user.value ? `${user.value.first_name} ${user.value.last_name}` : '',
  )

  const initials = computed(() => {
    const names = full_name.value.split(' ')
    const first = names[0]
    const last = names[names.length - 1]

    if (!first || first === '') {
      return ''
    } else if (first === last) {
      return first.substring(0, 2)
    } else {
      return first.charAt(0) + last!.charAt(0)
    }
  })

  const fetchUser = async () => {
    if (auth.isAuthenticated) {
      const response = await api.get('/user')
      user.value = response.data
    } else {
      user.value = null
    }
  }

  watchEffect(() => {
    if (auth.isAuthenticated) {
      fetchUser()
    }
  })

  return { user, full_name, initials, fetchUser }
})
