<template>
  <path
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
  /** 开始节点 */
  beginNode: {
    type: Object as PropType<IClientNode>,
    required: true
  },
  /** 结束节点 */
  endNode: {
    type: Object as PropType<IClientNode>,
    required: true
  }
})

const nodeRectStore = useNodeRectStore()

const theme = computed(() => nodeRectStore.state.theme)

const beginNodeStyle = computed(() => theme.value.getStyles(props.beginNode))
const endNodeStyle = computed(() => theme.value.getStyles(props.endNode))

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
  const { beginNode, endNode } = props
  const { selectedBorderWidth, selectedBorderPadding } = theme.value
  const beginX = beginNode.x + selectedBorderPadding + selectedBorderWidth
  const beginY =
    beginNode.y +
    selectedBorderPadding +
    selectedBorderWidth +
    beginNodeStyle.value.borderWidth +
    beginNodeStyle.value.paddingY +
    beginNode.height / 2

  const endX =
    endNode.x +
    selectedBorderPadding +
    selectedBorderWidth +
    endNode.width +
    (endNodeStyle.value.paddingX + endNodeStyle.value.borderWidth) * 2
  const endY =
    endNode.y +
    selectedBorderPadding +
    selectedBorderWidth +
    endNodeStyle.value.borderWidth +
    endNodeStyle.value.paddingY +
    endNode.height / 2
  return quadraticCurvePath({ beginX, beginY, endX, endY })
})
</script>

<style lang="less" scoped></style>
