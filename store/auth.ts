import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { AxiosResponse } from 'axios'
import { User } from '@/interfaces'

export function userInitialState() {
  return {
    id: null,
    first_name: '',
    last_name: '',
    full_name: '',
    email: '',
    is_logged: false
  }
}

export const state = () => ({
  user: userInitialState()
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_USER: (state, payload: User) => {
    Object.assign(state.user, payload)
  },

  RESET_USER: (state) => {
    state.user = userInitialState()
  }
}

export const getters: GetterTree<RootState, RootState> = {
  isLogged: state => state.user.is_logged
}

export const actions: ActionTree<RootState, RootState> = {
  async getLoggedUser({ commit }) {
    const response: AxiosResponse<User> = await this.$axios.get('users/me/')

    commit('SET_USER', response.data)
    return true
  },

  async login({ dispatch }, form: { username: string, password: string }) {
    let response: AxiosResponse<{ access_token: string; refresh_token: string }>;

    try {
      response = await this.$axios.post('auth/token/', {
        ...form,
        grant_type: 'password'
      })
    } catch (error) {
      response = (error as { response: AxiosResponse }).response
      if (response && response.status === 500) {
        return 'Error inesperado en el servidor'
      } else if (response.status) {
        return 'Correo o contraseña incorrectos'
      }
    }

    dispatch('setCredentials', response.data)
    const logged = await dispatch('getLoggedUser', response.data)

    return logged
  },

  // eslint-disable-next-line camelcase
  setCredentials(context, { access_token, refresh_token }) {
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)

    if (this.$axios.defaults && this.$axios.defaults.headers) {
      // eslint-disable-next-line camelcase
      this.$axios.defaults.headers.common.Authorization = `Bearer ${ access_token }`
    }
  },

  logout({ commit }) {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

    commit('RESET_USER')
  }
}
