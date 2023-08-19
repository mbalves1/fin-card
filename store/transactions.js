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
    async getTransactions() {
      try {
        const response = await getTransactions()
        const data = await response.json()
        this.transactions = data
        return data
      } catch (error) {
        throw new Error('Error to get transactions');
      }
    },
  }
})