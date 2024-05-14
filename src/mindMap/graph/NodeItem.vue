<template>
  <g :id="node.id" :transform="`matrix(1,0,0,1,${nodeRect.x},${nodeRect.y})`">
    <rect
      class="node-border active"
      :width="
        nodeRect.width +
        (nodeStyle.paddingX + theme.selectedBorderPadding + theme.selectedBorderWidth) * 2 +
        nodeStyle.borderWidth * 3
      "
      :height="
        nodeRect.height +
        (nodeStyle.paddingY + theme.selectedBorderPadding + theme.selectedBorderWidth) * 2 +
        nodeStyle.borderWidth * 3
      "
      :x="-(theme.selectedBorderPadding + theme.selectedBorderWidth + nodeStyle.borderWidth / 2)"
      :y="-(theme.selectedBorderPadding + theme.selectedBorderWidth + nodeStyle.borderWidth / 2)"
      :rx="nodeStyle.borderRadius"
      :ry="nodeStyle.borderRadius"
      fill-opacity="0"
      :stroke-width="theme.selectedBorderWidth"
      :stroke="theme.selectedBorderColor"
    />
    <rect
      class="signal-node"
      :width="nodeRect.width + (nodeStyle.paddingX + nodeStyle.borderWidth) * 2"
      :height="nodeRect.height + (nodeStyle.paddingY + nodeStyle.borderWidth) * 2"
      x="0"
      y="0"
      :rx="nodeStyle.borderRadius"
      :ry="nodeStyle.borderRadius"
      :fill="nodeStyle.fillColor"
      :stroke-dasharray="nodeStyle.borderDasharray"
      :stroke-width="nodeStyle.borderWidth"
      :stroke="nodeStyle.borderColor"
      cursor="pointer"
    />
    <!-- <rect
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
    /> -->
    <foreignObject
      class="node-foreignObject"
      :width="nodeRect.width"
      :height="nodeRect.height"
      :x="nodeStyle.paddingX + nodeStyle.borderWidth / 2"
      :y="nodeStyle.paddingY + nodeStyle.borderWidth / 2"
      cursor="pointer"
    >
      <div class="node-all-dom">
        <div class="text-img-dom">
          <div class="text-content-group">
            <div
              class="text-content-input"
              ref="textInputRef"
              :style="{
                fontFamily: nodeStyle.fontFamily,
                fontSize: `${nodeStyle.fontSize}px`,
                fontWeight: nodeStyle.fontWeight,
                lineHeight: nodeStyle.lineHeight,
                fontStyle: nodeStyle.fontStyle,
                color: nodeStyle.color
              }"
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
import { ref, computed, watch } from 'vue'
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

/** 文本节点 */
const textInputRef = ref<HTMLDivElement>()

const nodeRectStore = useNodeRectStore()

const nodeRect = computed(() => nodeRectStore.getNodeClientRect(props.node.id))
const theme = computed(() => nodeRectStore.state.theme)
const nodeStyle = computed(() => theme.value.getStyles(props.node))

watch(
  [() => props.node, () => textInputRef.value],
  ([newNode, newRef]) => {
    if (newRef) {
      const { width, height } = getSizeByElement(newRef)
      nodeRectStore.setClientNodeAttrs(newNode.id, { width, height })
    }
  },
  { deep: true }
)
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
