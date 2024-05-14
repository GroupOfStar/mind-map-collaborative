<template>
  <div
    class="container"
    ref="containerRef"
    :style="{ backgroundColor: state.theme.backgroundColor }"
  >
    <MindGraph :width="graphSize.width" :height="graphSize.height" :listNode="listNode" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'MindMap'
}
</script>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import MindGraph from './graph/index.vue'
import { iframe } from '@/iframe'
import { collaborate } from '@/service'
import type { ICollaborativeOpt } from '@/service'
import { useMindMapStore, useNodeRectStore } from '@/store'
import { useFullScreenSize } from './hooks'
import { parseStringify } from '@/utils'

const mindMapStore = useMindMapStore()
const { listNode } = storeToRefs(mindMapStore)

const nodeRectStore = useNodeRectStore()
const { state } = storeToRefs(nodeRectStore)

const { containerRef, graphSize } = useFullScreenSize()

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
    console.log('serviceNodes :>> ', nodes)
    mindMapStore.setupData(nodes, config)
  })
}

iframe.init().then((res) => {
  const { data, ...sdkMsg } = res.initialize
  console.log('iframe nodeTree :>> ', parseStringify(data, 'parse'))
  collaborativeInit(sdkMsg)
})
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  inset: 0;
}
</style>
