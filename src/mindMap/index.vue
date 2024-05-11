<template>
  <div class="container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="2560"
      height="580"
      style="position: relative"
    >
      <g transform="rotate(0) translate(0 0) scale(1)">
        <g class="g-boundary"></g>
        <g class="g-associative-lines"></g>
        <g class="g-lines"></g>
        <g class="g-nodes">
          <NodeItem v-for="item in listNode" :key="item.id" :node="item"></NodeItem>
        </g>
        <g class="g-associative-temp"></g>
        <g class="g-associative-text"></g>
        <g class="g-associative-controller"></g>
      </g>
      {{ console.log('listNode :>> ', listNode) }}
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MindMap'
}
</script>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { iframe } from '@/iframe'
import { collaborate } from '@/service'
import type { ICollaborativeOpt } from '@/service'
import { parseStringify } from '@/utils'
import { useMindMapStore } from '@/store'
import NodeItem from './components/NodeItem/index.vue'

const mindMapStore = useMindMapStore()
const { listNode } = storeToRefs(mindMapStore)

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

<style lang="less" scoped>
.note_wrapper {
  width: 100vw;
  height: 100vh;
  background-color: white;
  padding-top: 80px;
  .outline-main {
    max-width: 748px;
    min-width: 600px;
    position: relative;
    margin: auto;

    .outline-root {
      font-size: 32px;
      color: #191919;
      line-height: 40px;
      .root-title {
        outline: none;
        cursor: text;
      }
    }
    .root-line {
      height: 1px;
      margin: 4px 0 22px 0;
      background: #ebebeb;
    }
  }
  .null-node {
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: 16px;
    color: #cccccc;
    line-height: 24px;
    position: relative;
    padding: 6px 0;
    padding-left: 26px;
    cursor: text;
    .node-type.dot {
      display: inline-block;
      position: absolute;
      line-height: 16px;
      width: 14px !important;
      height: 14px !important;
      top: 11px;
      left: 0px;
      border-radius: 14px;
      background: #fff;
      cursor: pointer;
      span {
        border-radius: 100%;
        display: inline-block;
        background: #999;
        width: 6px;
        height: 6px;
        right: 4px;
        top: 50%;
        position: absolute;
        transform: translateY(-50%);
        border: 0;
      }
      transition: transform 0.2s ease-in-out;
    }
  }
}
</style>
