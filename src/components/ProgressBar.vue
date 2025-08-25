<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  maxValue: number
  minValue: number
}>()

const total = computed(() => Math.round((props.minValue / props.maxValue) * 100))
</script>

<template>
  <div class="px-5 w-full flex flex-row justify-center items-center dark:text-blue-300">
    <span class="font-bold px-[10px]">{{ props.minValue }}/{{ props.maxValue }} </span>
    <div class="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2.5">
      <div :style="{ width: total + '%' }" class="bg-blue-600 h-2.5 rounded-full"></div>
    </div>
    <span class="font-bold px-[10px]">{{ total }}% </span>
  </div>
</template>
