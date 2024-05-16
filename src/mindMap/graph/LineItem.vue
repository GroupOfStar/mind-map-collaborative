<template>
  <!-- d="M2135.5 685.5C2106.5 685.5 2106.5 764.25 2077.5 764.25 " -->
  <path
    v-if="!!prevNode"
    :d="path"
    fill="none"
    stroke-width="2"
    stroke="#ff0000"
    stroke-linecap="butt"
    stroke-linejoin="bevel"
  ></path>
</template>

<script lang="ts">
export default {
  name: 'LineItem'
}
</script>
<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import { useNodeRectStore } from '@/store'

const props = defineProps({
  /** 前一个节点 */
  prevNode: {
    type: Object as PropType<IClientNode>,
    required: false
  },
  /** 节点 */
  node: {
    type: Object as PropType<IClientNode>,
    required: true
  }
})

const nodeRectStore = useNodeRectStore()

const theme = computed(() => nodeRectStore.state.theme)
const nodeStyle = computed(() => theme.value.getStyles(props.node))

/**
 * 二次贝塞尔曲线
 * @param x1 开始位置的x轴
 * @param y1 开始位置的y轴
 * @param x2 结束位置的x轴
 * @param y2 结束位置的y轴
 * @returns path路径
 */
function quadraticCurvePath(edgePoint: {
  beginX: number
  beginY: number
  endX: number
  endY: number
}) {
  const { beginX, beginY, endX, endY } = edgePoint
  const cx = beginX + (endX - beginX) * 0.2
  const cy = beginY + (endY - beginY) * 0.8
  return `M ${beginX},${beginY} Q ${cx},${cy} ${endX},${endY}`
}

const path = computed(() => {
  const beginNode = props.prevNode || { x: 0, y: 0, width: 0, height: 0 }
  const endNode = props.node
  const beginX = beginNode.x + beginNode.width
  const beginY = beginNode.y + beginNode.height / 2
  const endX = endNode.x
  const endY = endNode.y + endNode.height / 2
  return quadraticCurvePath({ beginX, beginY, endX, endY })
})
</script>

<style lang="less" scoped>
.node-foreignObject {
  display: block;
  user-select: none;
  .text-content-group {
    .text-content-input {
      box-sizing: border-box;
      outline: none;
      white-space: pre-wrap;
      overflow-wrap: break-word;
      word-break: break-all;
      overflow: hidden;
      text-decoration: none;
    }
  }
}
</style>
