<template>
  <svg-canvas-graph :width="props.width" :height="props.height"></svg-canvas-graph>
</template>

<script lang="ts">
export default {
  name: 'MindMapIndex'
}
</script>
<script setup lang="ts">
const props = defineProps({
  width: { type: Number, required: false },
  height: { type: Number, required: false }
})
</script>

<style scoped></style>
