import { defineStore } from 'pinia'
import { register } from "../api.js"

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      first_name: "Murilo",
      last_name: "Barros",
      email: "avanti@palestra",
      password: "123",
      confirmpassword: "123"
    },
  }),
  actions: {
    async postRegister(payload) {
      console.log("action", payload);
      try {
        const response = await register(payload)
        const data = await response.json()

        this.release = data
      } catch (error) {
        throw new Error('Erro ao obter os lançamentos');
      }
    },
  }
})