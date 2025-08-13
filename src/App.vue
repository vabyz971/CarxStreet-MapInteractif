<script setup lang="ts">
import LeftBarMenu from '@/components/LeftBarMenu.vue'
import WorldMap from './components/WorldMap.vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCollectablesStore } from './stores/CollectablesStore'
import type { CollectablesPoint } from './interfaces/CollectablesPoint'

const store = useCollectablesStore()
const { points } = storeToRefs(store)

onMounted(async () => {
  try {
    await store.fetchCollectablesFiles()
  } catch (err) {
    console.log('Erreur API: ', err)
  }
})

const handleCollectableSelect = (point: CollectablesPoint) => {
  store.toggleValid(point)
}
</script>

<template>
  <div class="bg-white dark:bg-stone-800">
    <div class="flex flex-row h-screen">
      <div class="w-96 flex flex-col space-y-2 p-2">
        <LeftBarMenu />
      </div>
      <div class="flex-1 relative p-2">
        <WorldMap :points="points" @select-point="handleCollectableSelect" />
      </div>
    </div>
  </div>
</template>
