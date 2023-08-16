import { defineStore } from 'pinia'
import { postCard, getCard } from "../server/api-cards.js"

export const useCardStore = defineStore('card', {
  state: () => ({
    cards: [],
    msg: null,
  }),
  actions: {
    async postCard(payload) {
      const token = localStorage.getItem("token")

      try {
        const response = await postCard(payload, token)
        const data = await response.json()
        
        return data
      } catch (error) {
        this.msg = 'Error while registering card'
      }
    },
    async getCards() {
      const token = localStorage.getItem("token")
      try {
        const response = await getCard(token)

        this.cards = response
        return response
      } catch (error) {
        this.msg = 'Error to get card'
      }
    },
  }
})