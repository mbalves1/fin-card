import { defineStore } from 'pinia'
import { postCategory, getCategory } from "../server/api-category.js"

export const useCategory = defineStore('category', {
  state: () => ({
    categorys: []
  }),
  actions: {
    async postNewCategory(payload) {
      const token = localStorage.getItem("token")
      try {
        const response = await postCategory(payload, token)
        return response
      } catch (error) {
        console.error(error)
      }
    },
    async getAllCategory() {
      const token = localStorage.getItem("token")
      try {
        const response = await getCategory(token)
        return this.categorys = response
      } catch (error) {
        console.error(error)
      }
    }
  }
})