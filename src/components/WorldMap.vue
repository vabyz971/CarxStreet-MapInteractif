<script setup lang="ts">
import { LMap, LImageOverlay, LMarker } from '@vue-leaflet/vue-leaflet'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { CollectablesPoint } from '@/interfaces/CollectablesPoint'

const props = withDefaults(
  defineProps<{
    points: CollectablesPoint[]
  }>(),
  {
    points: () => [],
  },
)

const emit = defineEmits<{
  (e: 'select-point', point: CollectablesPoint): void
}>()

const crs = L.CRS.Simple
const bounds: L.LatLngBoundsExpression = [
  [0, 0],
  [1000, 1000],
]

function selectePoint(point: CollectablesPoint) {
  emit('select-point', point)
}

const iconBase = new L.Icon({
  iconUrl: '/public/img/collectables_tutorial_car.png',
  iconSize: [72, 64],
  iconAnchor: [32, 32],
})

const iconCheck = new L.Icon({
  iconUrl: '/public/img/collectables_tutorial_car_check.png',
  iconSize: [72, 64],
  iconAnchor: [32, 32],
})

const getIcon = (point: CollectablesPoint) => {
  return point.valid ? iconCheck : iconBase
}
</script>

<template>
  <div class="w-full h-full">
    <l-map
      class="rounded-lg"
      :crs="crs"
      :center="[500, 500]"
      :zoom="1"
      :maxZoom="3"
      :minZoom="0"
      :maxBounds="bounds"
    >
      <l-image-overlay url="/public/img/AUQJQfv.png" :bounds="bounds" />
      <l-marker
        v-for="point in props.points"
        :key="point.id"
        :lat-lng="[point.lat, point.lng]"
        :icon="getIcon(point)"
        @click="selectePoint(point)"
      >
      </l-marker>
    </l-map>
  </div>
</template>
