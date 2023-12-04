import { defineStore } from 'pinia'
import { postCategory, getCategory, putCategory, deleteCategory } from "../server/api-category.js"

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
        return response
      } catch (error) {
        console.error(error)
      }
    },
    async updateCategory(payload) {
      const token = localStorage.getItem("token")
      try {
        const response = await putCategory(payload, token)
        return response
      } catch (error) {
        console.error(error)
      }
    },
    async deleteCategory(id) {
      console.log(id)
      const token = localStorage.getItem("token")
      try {
        const response = await deleteCategory(id, token)
        return response
      } catch (error) {
        console.error(error)
      }
    }
  }
})