<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  maxValue: number
  minValue: number
}>()

const total = computed(() => Math.round((props.minValue / props.maxValue) * 100))
</script>

<template>
  <div class="bg-white dark:bg-stone-800 shadow-md rounded-lg overflow-hidden">
    <div class="px-5 py-3 flex justify-between items-center">
      <h3 class="text-zinc-900 dark:text-white text-lg">
        Progression {{ props.minValue }}/{{ props.maxValue }}
      </h3>
    </div>
    <div class="px-5 pb-5 mb-3">
      <div class="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2.5">
        <div :style="{ width: total + '%' }" class="bg-blue-600 h-2.5 rounded-full"></div>
        <span class="text-sm text-zinc-600 dark:text-zinc-400">{{ total }}% Complete</span>
      </div>
    </div>
  </div>
</template>
