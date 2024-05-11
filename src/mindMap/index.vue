<template>
  <div
    class="container"
    ref="containerRef"
    :style="{ backgroundColor: state.theme.backgroundColor }"
  >
    <MindGraph
      :width="graphSize.width"
      :height="graphSize.height"
      :state="state"
      :listNode="listNode"
    />
    {{ console.log('state.theme.backgroundColor :>> ', state.theme.backgroundColor) }}
  </div>
</template>

<script lang="ts">
export default {
  name: 'MindMap'
}
</script>
<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { iframe } from '@/iframe'
import { collaborate } from '@/service'
import type { ICollaborativeOpt } from '@/service'
import { parseStringify } from '@/utils'
import { useMindMapStore } from '@/store'
import MindGraph from './graph/index.vue'

const mindMapStore = useMindMapStore()
const { state, listNode } = storeToRefs(mindMapStore)

const containerRef = ref<HTMLDivElement>()
const graphSize = reactive({ width: 0, height: 0 })

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
    mindMapStore.setupData(nodes, config)
  })
}

iframe.init().then((res) => {
  const { data, ...sdkMsg } = res.initialize
  console.log('iframe nodeTree :>> ', parseStringify(data, 'parse'))
  collaborativeInit(sdkMsg)
})

function onResize() {
  if (containerRef.value) {
    console.log(
      'containerRef.value.getBoundingClientRect() :>> ',
      containerRef.value.getBoundingClientRect()
    )
    const { width, height } = containerRef.value.getBoundingClientRect()
    console.log('width, height :>> ', width, height)
    graphSize.width = width
    graphSize.height = height
  }
}

onMounted(() => {
  onResize()
  window.addEventListener('resize', onResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  inset: 0;
}
</style>
