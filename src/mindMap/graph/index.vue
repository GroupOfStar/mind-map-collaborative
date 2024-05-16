<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="width"
    :height="height"
    style="display: block"
  >
    <g transform="rotate(0) translate(0 0) scale(1)">
      <g class="g-boundary"></g>
      <g class="g-associative-lines"></g>

      <g class="g-nodes">
        <NodeItem v-for="item in serverNodeList" :key="item.id" :node="item" />
      </g>
      <g class="g-lines">
        <LineItem
          v-for="(item, index) in rectNodeList"
          :key="item.id"
          :prevNode="rectNodeList[index - 1]"
          :node="item"
        />
      </g>
      <g class="g-associative-temp"></g>
      <g class="g-associative-text"></g>
      <g class="g-associative-controller"></g>
    </g>
  </svg>
</template>

<script lang="ts">
export default {
  name: 'MindGraph'
}
</script>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import NodeItem from './NodeItem.vue'
import LineItem from './LineItem.vue'
import { useMindMapStore, useNodeRectStore } from '@/store'

defineProps({
  /** 宽度 */
  width: {
    type: Number,
    required: true
  },
  /** 高度 */
  height: {
    type: Number,
    required: true
  }
})

const mindMapStore = useMindMapStore()
const { serverNodeList } = storeToRefs(mindMapStore)

const nodeRectStore = useNodeRectStore()
const { rectNodeList } = storeToRefs(nodeRectStore)

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

<style lang="less" scoped></style>
