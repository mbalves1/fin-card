import { defineStore } from 'pinia'
import { postLogin, registerUser, getUser } from "../server/api-login.js"

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      token: null,
    },
    msgError: null
  }),
  actions: {
    async postRegister(payload) {
      try {
        const response = await registerUser(payload)
        const data = await response.json()
        
        return data
      } catch (error) {
        this.msgError = 'Error while registering user'
        throw new Error('Error while registering user');
      }
    },
    async postLogin(payload) {
      try {
        const response = await postLogin(payload)

        this.user.token = response.token
        localStorage.setItem("token", response.token)

        return response
      } catch (error) {
        throw new Error('Error login');
      }
    },
    async getUser() {
      try {
        const response = await getUser()
        localStorage.setItem("User", JSON.stringify(response.user))
        return response
      } catch (error) {
        throw new Error('Error login');
      }
    },
  }
})