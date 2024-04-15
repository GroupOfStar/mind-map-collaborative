<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="2560"
    height="580"
    style="position: relative"
  >
    <g transform="matrix(1,0,0,1,-613.9999999999999,0)">
      <g class="g-boundary"></g>
      <g class="g-associative-lines"></g>
      <g class="g-lines"></g>
      <g class="g-nodes">
        <NodeItem></NodeItem>
      </g>
      <g class="g-associative-temp"></g>
      <g class="g-associative-text"></g>
      <g class="g-associative-controller"></g>
    </g>
  </svg>
</template>

<script lang="ts">
export default {
  name: 'MindMap'
}
</script>
<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import type { PropType } from 'vue'
import NodeItem from './components/NodeItem/index.vue'

interface IPopoverType {
  visible: boolean
  nodeData?: NodeData
  element: HTMLElement | null
  currentIcon?: string
}

const props = defineProps({
  /** 节点树 */
  treeData: {
    type: Array as PropType<NodeData[]>,
    required: false
  }
})

/** 当前激活的节点 */
const activeNode = ref<NodeData>()
/** 节点选择状态 */
const nodeSelected = ref(false)
/** 图标浮窗状态 */
const iconState = reactive<IPopoverType>({
  visible: false,
  currentIcon: undefined,
  nodeData: undefined,
  element: null
})

onMounted(() => {})

onUnmounted(() => {})
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
