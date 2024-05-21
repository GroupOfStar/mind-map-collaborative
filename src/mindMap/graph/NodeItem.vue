<template>
  <g
    :id="node.id"
    class="node-wrapper"
    :transform="`matrix(1,0,0,1,${nodeRect.x + theme.selectedBorderPadding + theme.selectedBorderWidth},${nodeRect.y + theme.selectedBorderPadding + theme.selectedBorderWidth})`"
    @click="(ev) => onNodeClick(ev, node)"
  >
    <rect
      :class="['node-border', { active: activeNode.value?.id === node.id }]"
      :width="
        nodeRect.width +
        (nodeStyle.paddingX + theme.selectedBorderPadding + nodeStyle.borderWidth) * 2 +
        theme.selectedBorderWidth
      "
      :height="
        nodeRect.height +
        (nodeStyle.paddingY + theme.selectedBorderPadding + nodeStyle.borderWidth) * 2 +
        theme.selectedBorderWidth
      "
      :x="-(theme.selectedBorderPadding + theme.selectedBorderWidth / 2)"
      :y="-(theme.selectedBorderPadding + theme.selectedBorderWidth / 2)"
      :rx="nodeStyle.borderRadius"
      :ry="nodeStyle.borderRadius"
      fill-opacity="0"
      :stroke-width="theme.selectedBorderWidth"
    />
    <rect
      class="signal-node"
      :width="nodeRect.width + nodeStyle.paddingX * 2 + nodeStyle.borderWidth"
      :height="nodeRect.height + nodeStyle.paddingY * 2 + nodeStyle.borderWidth"
      :x="nodeStyle.borderWidth / 2"
      :y="nodeStyle.borderWidth / 2"
      :rx="nodeStyle.borderRadius"
      :ry="nodeStyle.borderRadius"
      :fill="nodeStyle.fillColor"
      :stroke-dasharray="nodeStyle.borderDasharray"
      :stroke-width="nodeStyle.borderWidth"
      :stroke="nodeStyle.borderColor"
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
      :x="nodeStyle.paddingX + nodeStyle.borderWidth"
      :y="nodeStyle.paddingY + nodeStyle.borderWidth"
      @mousedown.stop
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
import { ref, computed, watch, nextTick } from 'vue'
import type { Ref, PropType } from 'vue'
import { getSizeByElement } from './../utils/'
import { useNodeRectStore } from '@/store'

const props = defineProps({
  /** 节点 */
  node: {
    type: Object as PropType<ITreeNode>,
    required: true
  },
  /** 激活的节点 */
  activeNode: {
    type: Object as PropType<Ref<ITreeNode | undefined>>,
    required: true
  },
  /** 节点点击 */
  onNodeClick: {
    type: Function as PropType<(ev: MouseEvent, node?: ITreeNode) => void>,
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
  [() => props.node, () => textInputRef.value, () => theme.value.textAutoWrapWidth],
  ([newNode, newRef, newMaxWidth]) =>
    nextTick(() => {
      if (newRef && newMaxWidth) {
        let { width, height } = getSizeByElement(newRef)
        if (width > newMaxWidth) {
          const maxWidthRect = getSizeByElement(newRef, `${newMaxWidth}px`)
          width = maxWidthRect.width
          height = maxWidthRect.height
        }
        nodeRectStore.setClientNodeAttrs(newNode.id, { width, height })
      }
    }),
  { deep: true }
)
</script>

<style lang="less" scoped>
.node-wrapper {
  &:hover .node-border {
    stroke: var(--selected-border-color-hover);
  }
  .node-border.selected {
    stroke: var(--selected-border-color-select);
  }
  .node-border.active {
    stroke: var(--selected-border-color-active);
  }

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
}
</style>
