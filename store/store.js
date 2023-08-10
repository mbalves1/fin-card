import { defineStore } from 'pinia'
import { getCards } from "../api.js"

export const useCounterStore = defineStore('counter', {
  state: () => ({
    release: [],
    cards: []
  }),
  actions: {
    async getCards() {
      try {
        const response = await getCards()
        const data = await response.json()

        this.cards = data
      } catch (error) {
        throw new Error('Erro ao obter os lançamentos');
      }
    }
  }
})

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot))
// }