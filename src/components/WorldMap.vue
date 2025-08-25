<script setup lang="ts">
import { LMap, LImageOverlay, LMarker } from '@vue-leaflet/vue-leaflet'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { CollectablesPoint } from '@/interfaces/CollectablesPoint'
import collectables_car from '@/assets/img/collectables_tutorial_car.png'
import collectables_car_check from '@/assets/img/collectables_tutorial_car_check.png'
import sunset_city from '@/assets/img/AUQJQfv.png'

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
  iconUrl: collectables_car,
  iconSize: [72, 64],
  iconAnchor: [32, 32],
})

const iconCheck = new L.Icon({
  iconUrl: collectables_car_check,
  iconSize: [72, 64],
  iconAnchor: [32, 32],
})

const getIcon = (point: CollectablesPoint) => {
  return point.valid ? iconCheck : iconBase
}
</script>

<template>
  <div class="w-full h-full">
    <l-map :crs="crs" :center="[500, 500]" :zoom="1" :maxZoom="3" :minZoom="0" :maxBounds="bounds">
      <l-image-overlay :url="sunset_city" :bounds="bounds" />
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
