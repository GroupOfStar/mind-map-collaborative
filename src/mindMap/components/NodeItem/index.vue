<template>
  <g :id="node.id" :transform="`matrix(1,0,0,1,${node.x},${node.y})`">
    <rect
      class="node-border active"
      :width="node.width + 64 + 8 + 1"
      :height="node.height + 24 + 8 + 1"
      x="-4"
      y="-4"
      rx="8"
      ry="8"
      fill-opacity="0"
      stroke-width="1"
      stroke="#7716d9"
    />
    <rect
      class="signal-node"
      :width="node.width + 64"
      :height="node.height + 24"
      x="0"
      y="0"
      rx="8"
      ry="8"
      fill="#026d77"
      stroke-dasharray="none"
      stroke-width="0"
      stroke="transparent"
      cursor="pointer"
    />
    <rect
      class="drag-scale-left"
      width="10"
      :height="node.height + 24"
      x="-9"
      y="0"
      cursor="e-resize"
      fill="transparent"
    />
    <rect
      class="drag-scale-right"
      width="10"
      :height="node.height + 24"
      :x="node.width + 64 + 1"
      y="0"
      cursor="e-resize"
      id="drag-scale"
      fill="transparent"
    />
    <foreignObject
      class="node-foreignObject"
      :width="node.width"
      :height="node.height"
      x="32"
      y="12"
      cursor="pointer"
      style="user-select: none"
    >
      <div class="node-all-dom">
        <div class="text-img-dom">
          <div class="text-content-group">
            <div
              class="text-content-input"
              ref="textInputRef"
              style="
                box-sizing: border-box;
                outline: none;
                white-space: pre-wrap;
                overflow-wrap: break-word;
                word-break: break-all;
                overflow: hidden;
                font-family: Harmony Medium;
                font-size: 24px;
                font-weight: 600;
                line-height: 1.5;
                font-style: normal;
                color: rgba(255, 255, 255, 0.8);
                text-decoration: none;
              "
            >
              {{ node.text }}
            </div>
            <div
              class="text-other-group"
              style="flex-shrink: 0; display: flex; align-items: center"
            ></div>
          </div>
        </div>
      </div>
    </foreignObject>
  </g>
</template>

<script lang="ts">
export default {
  name: 'NodeItem'
}
</script>
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import type { PropType } from 'vue'
import { getSizeByElement } from './../../utils/'
import { useMindMapStore } from '@/store'

const props = defineProps({
  /** 节点树 */
  node: {
    type: Object as PropType<ITreeNode>,
    required: true
  }
})

const mindMapStore = useMindMapStore()

/** 文本节点 */
const textInputRef = ref<HTMLDivElement>()

onMounted(() => {
  nextTick(() => {
    if (textInputRef.value) {
      const { width, height } = getSizeByElement(textInputRef.value)
      mindMapStore.setClientNodeAttrs(props.node, { width, height })
    }
  })
})
</script>

<style lang="less" scoped>
.node-foreignObject {
  display: block;
}
</style>
