// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    token: null as string | null,
    expiresAt: null as string | null,
    userEmail: null as string | null,
    userName: null as string | null,
  }),
  getters: {
    getToken: (state) => state.token,
  },
  actions:{
    setToken(data: string){
      this.token = data
    }
  }
})
