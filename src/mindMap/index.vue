<template>
  <div
    class="mind-map-container"
    ref="containerRef"
    :style="{ backgroundColor: state.theme.backgroundColor }"
    @mousedown="onContainerMousedown"
    @mousemove="onContainerMousemove"
    @mouseup="onContainerMouseup"
    @contextmenu="container.onContextmenu"
    @wheel="container.onWheel"
    @click="selection.onContainerClick"
  >
    <MindGraph
      :containerRect="container.containerRect"
      :graphRect="graphRect"
      :rectNodeList="rectNodeList"
      :edgeNodeList="edgeNodeList"
      :activeNode="selection.activeNode"
      :selectedNodeList="selection.selectedNodeList"
      :onNodeClick="selection.onNodeClick"
      :points="selection.points.value"
    />
    <ScrollBar
      :width="container.containerRect.width"
      :height="container.containerRect.height"
      :scrollX="scrollX"
      :scrollY="scrollY"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'MindMap'
}
</script>
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import MindGraph from './graph/index.vue'
import ScrollBar from './components/ScrollBar/index.vue'
import { useNodeRectStore } from '@/store'
import { useGraphScroll, useBarScroll, useContainer, useSelection } from './hooks'

/** 容器ref */
const containerRef = ref<HTMLDivElement>()

const nodeRectStore = useNodeRectStore()
const { state, rectNodeTree, rectNodeList, graphSize, edgeNodeList } = storeToRefs(nodeRectStore)

const { graphRect, setGraphPosition } = useGraphScroll(graphSize)
const container = useContainer(containerRef, graphRect, setGraphPosition)
const scrollX = useBarScroll(
  computed(() => ({
    type: 'horizontal',
    graphOffset: graphRect.value.x,
    graphSize: graphRect.value.width,
    containerSize: container.containerRect.width,
    setGraphPosition
  }))
)
const scrollY = useBarScroll(
  computed(() => ({
    type: 'vertical',
    graphOffset: graphRect.value.y,
    graphSize: graphRect.value.height,
    containerSize: container.containerRect.height,
    setGraphPosition
  }))
)

/** 节点选择 */
const selection = useSelection(rectNodeTree, graphRect)

function onContainerMousedown(ev: MouseEvent) {
  container.onMousedown(ev)
  selection.onMousedown(ev)
}
function onContainerMousemove(ev: MouseEvent) {
  container.onMousemove(ev)
}
function onContainerMouseup(ev: MouseEvent) {
  container.onMouseup(ev)
}

function onWindowResize() {
  container.onResize()
  container.onGraphCenter()
}

function onDocumentMousedown(ev: MouseEvent) {}

function onDocumentMousemove(ev: MouseEvent) {
  scrollX.onMousemove(ev)
  scrollY.onMousemove(ev)
  selection.onMousemove(ev)
}

function onDocumentMouseup(ev: MouseEvent) {
  scrollX.onMouseup(ev)
  scrollY.onMouseup(ev)
  selection.onMouseup(ev)
}

onMounted(() => {
  onWindowResize()
  window.addEventListener('resize', onWindowResize)
  document.addEventListener('mousedown', onDocumentMousedown)
  document.addEventListener('mousemove', onDocumentMousemove)
  document.addEventListener('mouseup', onDocumentMouseup)
})
onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize)
  document.removeEventListener('mousedown', onDocumentMousedown)
  document.removeEventListener('mousemove', onDocumentMousemove)
  document.removeEventListener('mouseup', onDocumentMouseup)
})
</script>

<style scoped lang="scss">
.mind-map-container {
  width: 100%;
  height: 100%;
}
</style>
