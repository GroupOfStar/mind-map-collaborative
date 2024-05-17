<template>
  <div
    class="container"
    ref="containerRef"
    :style="{ backgroundColor: state.theme.backgroundColor }"
  >
    <MindGraph
      :width="containerSize.width"
      :height="containerSize.height"
      :graphRect="graphRect"
      :serverNodeList="serverNodeList"
      :rectNodeList="rectNodeList"
    />
    <ScrollBar
      :width="containerSize.width"
      :height="containerSize.height"
      :scrollRect="scrollRect"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'MindMap'
}
</script>
<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import MindGraph from './graph/index.vue'
import ScrollBar from '@/components/ScrollBar/index.vue'
import { iframe } from '@/iframe'
import { collaborate } from '@/service'
import type { ICollaborativeOpt } from '@/service'
import { useMindMapStore, useNodeRectStore } from '@/store'
import { useScroll } from './hooks'
import { parseStringify } from '@/utils'

const mindMapStore = useMindMapStore()
const { serverNodeList } = storeToRefs(mindMapStore)

const nodeRectStore = useNodeRectStore()
const { state, rectNodeList, graphSize } = storeToRefs(nodeRectStore)

const { containerRef, containerSize, graphRect, scrollRect, onGraphCenter } = useScroll(graphSize)

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

// 初次加载完后居中, 后面就不再执行
const unwatch = watch(
  [() => containerSize.value.width, () => graphRect.value.width],
  ([cw, gw]) => {
    if (cw > 0 && gw > 0) {
      onGraphCenter()
      unwatch()
    }
  }
)

onMounted(() => {
  // onGraphCenter()
})
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  inset: 0;
  overflow: hidden;
}
</style>
