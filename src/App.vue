<template>
  <header>
    <div class="container">
      <MindMap></MindMap>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import MindMap from './mindMap/index.vue'
import { iframe } from './iframe/index'
import { collaborate } from './service/index'
import type { ICollaborativeOpt } from './service/index'
import { parseStringify } from './utils'

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
  collaborate.factoryAddListener()
}

iframe.init().then((res) => {
  const { data, ...sdkMsg } = res.initialize
  console.log('iframe nodeTree :>> ', parseStringify(data, 'parse'))
  collaborativeInit(sdkMsg)
})

function clipboard() {
  navigator.clipboard.read().then((res) => {
    res.forEach((item) => {
      console.log('item :>> ', item)
      // item.getType('text/html').then((re) => {
      //   re.text().then((text) => {
      //     console.log('text :>> ', text)
      //   })
      // })
      item.getType('text/plain').then((re) => {
        re.text().then((text) => {
          console.log('text :>> ', text)
        })
      })
    })
  })
}

onMounted(() => {
  document.addEventListener('copy', clipboard)
})
onUnmounted(() => {
  document.removeEventListener('copy', clipboard)
})
</script>

<style scoped></style>
