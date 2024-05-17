<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="width"
    :height="height"
    style="display: block"
  >
    <g :transform="`rotate(0) translate(${graphRect.x}, ${graphRect.y}) scale(1)`">
      <g class="g-boundary"></g>
      <g class="g-associative-lines"></g>
      <g class="g-lines">
        <LineItem
          v-for="(item, index) in rectNodeList"
          :key="item.id"
          :prevNode="rectNodeList[index - 1]"
          :node="item"
        />
      </g>
      <g class="g-nodes">
        <NodeItem v-for="item in serverNodeList" :key="item.id" :node="item" />
      </g>
      <g class="g-associative-temp"></g>
      <g class="g-associative-text"></g>
      <g class="g-associative-controller"></g>
      <circle :cx="graphRect.width / 2" :cy="graphRect.height / 2" r="10" fill="red" />
      {{ console.log('graphRect :>> ', graphRect.width, graphRect.height) }}
    </g>
  </svg>
</template>

<script lang="ts">
export default {
  name: 'MindGraph'
}
</script>
<script setup lang="ts">
import { onMounted, onUnmounted, type PropType } from 'vue'
import NodeItem from './NodeItem.vue'
import LineItem from './LineItem.vue'

defineProps({
  /** 画布宽度 */
  width: {
    type: Number,
    required: true
  },
  /** 画布高度 */
  height: {
    type: Number,
    required: true
  },
  /** graph图形位置信息 */
  graphRect: {
    type: Object as PropType<IRect>,
    required: true
  },
  /** 服务数据NodeList */
  serverNodeList: {
    type: Array as PropType<ITreeNode[]>,
    required: true
  },
  /** 视图数据NodeList */
  rectNodeList: {
    type: Array as PropType<IClientNode[]>,
    required: true
  }
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

<style lang="less" scoped></style>
