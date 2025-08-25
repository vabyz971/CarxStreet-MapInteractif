<script setup lang="ts">
import IconMenu from './components/IconMenu.vue'
import WorldMap from './components/WorldMap.vue'
import ProgressBar from './components/ProgressBar.vue'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCollectablesStore } from './stores/CollectablesStore'
import type { CollectablesPoint } from './interfaces/CollectablesPoint'

const store = useCollectablesStore()
const { points } = storeToRefs(store)

const is_expended = ref(localStorage.getItem('is_expanded') === 'true')

onMounted(async () => {
  try {
    await store.fetchCollectablesFiles()
  } catch (err) {
    console.log('Erreur API: ', err)
  }
  is_expended.value = true
})

const handleCollectableSelect = (point: CollectablesPoint) => {
  store.toggleValid(point)
}

const toggleSideBar = () => {
  is_expended.value = !is_expended.value
  localStorage.setItem('is_expended', is_expended.value)
}
</script>

<template>
  <div class="w-screen h-screen flex">
    <!--Side bar-->
    <div
      class="w-[720px] h-full bg-gray-200 text-white sidebar"
      :class="`${is_expended && 'is-expanded'}`"
    >
      <div class="h-[50px] bg-gray-900 flex justify-start items-center">
        <div class="px-[20px]">
          <h3 class="font-bold text-xl">Carx Street Map interactif</h3>
        </div>
      </div>
      <div class="h-[calc(100vh-50px)] bg-gray-800 text-sm">
        <p class="px-[20px] pt-5">
          Welcome to the interactive map, Alpha version, of CarxStreet. This app was created by a
          fan for carxStreet fans. It is in no way associated with CarxTechnologies. Here, you can
          track your prototype part collection progress within Sunset City. The car parts (VAN, L08,
          V45) share the same positions as the prototype parts. <br />
        </p>
        <p class="px-[20px] pt-5">
          Source map:
          <a class="text-blue-400" href="https://www.youtube.com/watch?v=D7Yea9FYzzo">Lien</a>
        </p>
      </div>
    </div>
    <div class="w-full h-full bg-gray-400">
      <div
        class="h-[50px] bg-gray-100 flex items-center shadow-sm px-[20px] w-full py-[10px] z-10 border-b"
      >
        <div class="cursor-pointer w-[30px]" @click="toggleSideBar">
          <IconMenu />
        </div>
        <ProgressBar
          :min-value="useCollectablesStore().totalPointIsValue"
          :max-value="useCollectablesStore().totalPoint"
        />
      </div>
      <div class="h-[calc(100vh-50px)] bg-white">
        <WorldMap :points="points" @select-point="handleCollectableSelect" />
      </div>
    </div>
  </div>
  <div></div>
</template>

<style>
* {
  font-family: 'Roboto', sans-serif;
}

.sidebar {
  transition: all 0.3s ease-in;
}

.is-expanded {
  width: 0;
}
</style>
