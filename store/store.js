import { defineStore } from 'pinia'
import { getReleases } from "../api.js"

export const useCounterStore = defineStore('counter', {
  state: () => ({
    release: []
  }),
  actions: {
    async getReleases() {
      try {
        const response = await getReleases()
        const data = await response.json()

        this.release = data
      } catch (error) {
        throw new Error('Erro ao obter os lançamentos');
      }
    }
  }
})

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot))
// }