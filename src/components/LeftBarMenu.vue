<script setup lang="ts">
import ProgressBar from './ProgressBar.vue'
import { useCollectablesStore } from '@/stores/CollectablesStore'
</script>

<template>
  <div class="flex flex-col dark:text-white">
    <div class="flex flex-col">
      <img class="logo w-[250px]" src="/public/img/Logo_CarX_Street.png" alt="CarxSteet Logo" />
      <h1 class="font-sans font-bold text-3xl">Map interactif</h1>
    </div>
    <div class="flex flex-col pt-5">
      <p class="text-sm">
        Welcome to the interactive map, Alpha version, of CarxStreet. This app was created by a fan
        for carxStreet fans. It is in no way associated with CarxTechnologies. Here, you can track
        your prototype part collection progress within Sunset City. The car parts (VAN, L08, V45)
        share the same positions as the prototype parts. <br />
      </p>
      <p class="pt-3">
        Source :
        <a class="text-blue-400" href="https://www.youtube.com/watch?v=D7Yea9FYzzo">Lien</a>
      </p>
    </div>
    <div class="flex flex-col pt-5">
      <ProgressBar
        :min-value="useCollectablesStore().totalPointIsValue"
        :max-value="useCollectablesStore().totalPoint"
      />
    </div>
  </div>
</template>

<style scoped></style>
