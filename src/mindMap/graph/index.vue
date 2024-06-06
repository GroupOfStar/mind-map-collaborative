<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="containerRect.width"
    :height="containerRect.height"
    style="display: block"
  >
    <g :transform="`rotate(0) translate(${graphRect.x}, ${graphRect.y}) scale(1)`">
      <g class="g-boundary"></g>
      <g class="g-associative-lines"></g>
      <g class="g-lines">
        <LineItem
          v-for="item in edgeNodeList"
          :key="item.beginNode.id + item.endNode.id"
          :beginNode="item.beginNode"
          :endNode="item.endNode"
        />
      </g>
      <g class="g-nodes">
        <NodeItem
          v-for="item in serverNodeList"
          :key="item.id"
          :node="item"
          :activeNode="activeNode"
          :selectedNodeList="selectedNodeList"
          :onNodeClick="onNodeClick"
        />
      </g>
      <g class="g-associative-temp"></g>
      <g class="g-associative-text"></g>
      <g class="g-associative-controller"></g>
      <circle
        :cx="graphRect.width / 2"
        :cy="graphRect.height / 2"
        r="10"
        fill="white"
        stroke="red"
        stroke-width="18"
      />
    </g>
    <polygon :points="points" stroke="#0984e3" fill="rgba(9,132,227,0.15)" />
  </svg>
</template>

<script lang="ts">
export default {
  name: 'MindGraph'
}
</script>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import type { Ref, PropType } from 'vue'
import NodeItem from './NodeItem.vue'
import LineItem from './LineItem.vue'

defineProps({
  /** container画布图形位置信息 */
  containerRect: {
    type: Object as PropType<IRect>,
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
  },
  /** 连线list */
  edgeNodeList: {
    type: Array as PropType<IEdgeNode[]>,
    required: true
  },
  /** 激活的节点 */
  activeNode: {
    type: Object as PropType<Ref<ITreeNode | undefined>>,
    required: true
  },
  /** 选择的节点 */
  selectedNodeList: {
    type: Object as PropType<Ref<ITreeNode[]>>,
    required: true
  },
  /** 节点点击 */
  onNodeClick: {
    type: Function as PropType<(ev: MouseEvent, node: ITreeNode) => void>,
    required: true
  },
  /** 选框器点位信息 */
  points: {
    type: String,
    required: false
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
