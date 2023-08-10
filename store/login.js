import { defineStore } from 'pinia'
import { postLogin } from "../server/api-login.js"

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      token: null,
    }
  }),
  actions: {
    async postRegister(payload) {
      try {
        const response = await register(payload)
        const data = await response.json()
        this.release = data
      } catch (error) {
        throw new Error('Erro ao obter os lançamentos');
      }
    },
    async postLogin(payload) {
      console.log("action login", payload);
      try {
        const response = await postLogin(payload)

        this.user.token = response.token
        localStorage.setItem("token", response.token)
        console.log("CCC", response)
        return response
      } catch (error) {
        throw new Error('Error login');
      }
    },
  }
})