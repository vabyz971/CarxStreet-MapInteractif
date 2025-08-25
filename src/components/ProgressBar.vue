<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  maxValue: number
  minValue: number
}>()

const total = computed(() => Math.round((props.minValue / props.maxValue) * 100))
</script>

<template>
  <div class="px-5 w-full flex flex-row justify-center items-center">
    <span class="font-bold text-zinc-600 dark:text-zinc-400 px-[10px]"
      >{{ props.minValue }}/{{ props.maxValue }} {{ total }}%
    </span>
    <div class="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2.5">
      <div :style="{ width: total + '%' }" class="bg-blue-600 h-2.5 rounded-full"></div>
    </div>
  </div>
</template>
