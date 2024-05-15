<template>
  <path
    d="M2135.5 685.5C2106.5 685.5 2106.5 764.25 2077.5 764.25 "
    fill="none"
    stroke-width="2"
    stroke="#ff0000"
  ></path>
</template>

<script lang="ts">
export default {
  name: 'LineItem'
}
</script>
<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import type { PropType } from 'vue'
import { getSizeByElement } from './../utils/'
import { useNodeRectStore } from '@/store'

const props = defineProps({
  /** 节点 */
  node: {
    type: Object as PropType<ITreeNode>,
    required: true
  }
})

const nodeRectStore = useNodeRectStore()

const nodeRect = computed(() => nodeRectStore.getNodeClientRect(props.node.id))
const theme = computed(() => nodeRectStore.state.theme)
const nodeStyle = computed(() => theme.value.getStyles(props.node))
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
