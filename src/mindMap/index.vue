<template>
  <div
    class="container"
    ref="containerRef"
    :style="{ backgroundColor: state.theme.backgroundColor }"
    @mousedown="container.onMousedown"
    @mousemove="container.onMousemove"
    @mouseup="container.onMouseup"
    @contextmenu="container.onContextmenu"
    @wheel="container.onWheel"
  >
    <MindGraph
      :containerRect="container.containerRect"
      :graphRect="graphRect"
      :serverNodeList="serverNodeList"
      :rectNodeList="rectNodeList"
      :edgeNodeList="edgeNodeList"
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
import ScrollBar from '@/components/ScrollBar/index.vue'
import { iframe } from '@/iframe'
import { collaborate } from '@/service'
import type { ICollaborativeOpt } from '@/service'
import { useMindMapStore, useNodeRectStore } from '@/store'
import { useGraphScroll, useBarScroll, useContainer } from './hooks'
import { parseStringify } from '@/utils'

/** 容器ref */
const containerRef = ref<HTMLDivElement>()

const mindMapStore = useMindMapStore()
const { serverNodeList } = storeToRefs(mindMapStore)

const nodeRectStore = useNodeRectStore()
const { state, rectNodeList, graphSize, edgeNodeList } = storeToRefs(nodeRectStore)

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

function collaborativeInit(sdkMsg: any) {
  const { docId, collaConfig, traceId, realName } = sdkMsg
  const option: ICollaborativeOpt = {
    docId,
    scene: collaConfig?.scene,
    authenticate: {
      traceId,
      realName,
      ...collaConfig?.authentication
    },
    WSDocumentPlugin: {
      ...collaConfig?.collabOptions,
      awarenessDebounceMs: 100 //awareness防抖间隔默认为100
    }
  }
  collaborate.init(option)
  collaborate.registryAwareNess()
  collaborate.factoryAddListener(function (nodes, config) {
    console.log('serviceNodes :>> ', nodes, 'serviceConfig :>>', config)
    mindMapStore.setupData(nodes, config)
  })
}

iframe.init().then((res) => {
  const { data, ...sdkMsg } = res.initialize
  console.log('iframe nodeTree :>> ', parseStringify(data, 'parse'))
  collaborativeInit(sdkMsg)
})

function onWindowResize() {
  container.onResize()
  container.onGraphCenter()
}

function onDocumentMousemove(ev: MouseEvent) {
  scrollX.onMousemove(ev)
  scrollY.onMousemove(ev)
}

function onDocumentMouseup(ev: MouseEvent) {
  scrollX.onMouseup(ev)
  scrollY.onMouseup(ev)
}

onMounted(() => {
  onWindowResize()
  window.addEventListener('resize', onWindowResize)
  document.addEventListener('mousemove', onDocumentMousemove)
  document.addEventListener('mouseup', onDocumentMouseup)
})
onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize)
  document.removeEventListener('mousemove', onDocumentMousemove)
  document.removeEventListener('mouseup', onDocumentMouseup)
})
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  inset: 0;
  overflow: hidden;
}
</style>
