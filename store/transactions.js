import { defineStore } from 'pinia'
import { postTransactions, getTransactions } from "../server/api-transactions.js"

export const useTransactions = defineStore('transactions', {
  state: () => ({
    transactions: []
  }),
  actions: {
    async postTransactions(payload) {
      const token = localStorage.getItem("token")
      try {
        const response = await postTransactions(payload, token)
        const data = await response.json()
        this.transactions = data
        return
      } catch (error) {
        console.error(error)
      }
    },
    async getTransactions(pages) {
      try {
        const response = await getTransactions(pages)
        const data = await response.json()
        console.log("data", data)
        this.transactions = data
        return data
      } catch (error) {
        console.error(error)
      }
    },
  }
})