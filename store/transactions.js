import { defineStore } from 'pinia'
import {
  postTransactions,
  getTransactions,
  deleteTransaction,
  getTransactionsFilters,
  putTransaction
} from "../server/api-transactions.js"

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
        this.transactions = data
        return data
      } catch (error) {
        console.error(error)
      }
    },
    async getFiltersTransactions(filter, pages) {
      try {
        const response = await getTransactionsFilters(filter, pages)
        const data = await response.json()
        this.transactions = data
        return data
      } catch (error) {
        console.error(error)
      }
    },
    async deleteTransaction(id) {
      try {
        const response = await deleteTransaction(id)
        return response
      } catch (error) {
        console.error(error)
      }
    },
    async putTransactions(payload) {
      try {
        const response = await putTransaction(payload)
        return response
      } catch (error) {
        console.error(error)
      }
    }
  }
})