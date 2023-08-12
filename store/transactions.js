import { defineStore } from 'pinia'
import { postTransactions, getTransactions } from "../server/api-transactions.js"

export const useTransactions = defineStore('transactions', {
  state: () => ({
    transactions: []
  }),
  actions: {
    async postTransactions(payload) {
      console.log("paiylood post", payload);
      const token = localStorage.getItem("token")
      console.log("token post", token);
      try {
        const response = await postTransactions(payload, token)
        const data = await response.json()
        this.transactions = data
      } catch (error) {
        throw new Error('Error to register a new transaction');
      }
    },
    async getTransactions() {
      try {
        const response = await getTransactions()
        const data = await response.json()
        console.log("data", data)
        this.transactions = data
        return data
      } catch (error) {
        throw new Error('Error to get transactions');
      }
    },
  }
})