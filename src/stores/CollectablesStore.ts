import { defineStore } from 'pinia'
import type { CollectablesPoint } from '@/interfaces/CollectablesPoint'

export const useCollectablesStore = defineStore('collectablesStore', {
  state: () => ({
    points: [] as CollectablesPoint[],
  }),

  getters: {
    totalPoint: (state) => {
      return state.points.length
    },
    totalPointIsValue: (state) => {
      return state.points.filter((p) => p.valid).length
    },
  },

  actions: {
    async fetchCollectablesFiles() {
      try {
        const res = await fetch('/public/CoordonnePoint.json')
        this.points = await res.json()
      } catch (error) {
        console.log(error)
      }
    },

    toggleValid(collectables: CollectablesPoint) {
      const index = this.points.find((item) => item.id == collectables.id)
      if (index) {
        index.valid = !index.valid
        index.isNew = false
      } else {
        console.error('Element not found')
      }
    },
  },
})
