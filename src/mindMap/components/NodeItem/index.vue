<template>
  <g id="mind2c16c00f40a24c28b115f60f9c27bf0f" transform="matrix(1,0,0,1,1200,260)">
    <rect
      width="168"
      height="68"
      x="-4"
      y="-4"
      class="node-border active"
      fill-opacity="0"
      strock-width="1"
      stroke="#7716d9"
      rx="8"
      ry="8"
    ></rect>
    <rect
      width="160"
      height="60"
      class="signal-node"
      fill="#026d77"
      stroke-dasharray="none"
      stroke-width="0"
      stroke="transparent"
      rx="8"
      ry="8"
    ></rect>
    <rect
      class="drag-scale"
      cursor="e-resize"
      id="drag-scale"
      fill="transparent"
      x="159"
      width="10"
      y="4"
      height="52"
    ></rect>
    <rect
      class="drag-scale-left"
      cursor="e-resize"
      id="drag-scale-left"
      fill="transparent"
      x="-9"
      width="10"
      y="4"
      height="52"
    ></rect>
    <foreignObject
      class="node-foreignObject"
      x="32"
      y="12"
      :width="textContainer.width"
      :height="textContainer.height"
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
              中心节点
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
import { nextTick, onMounted, ref, reactive, watch } from 'vue'
import { getSizeByElement } from './../../utils/'

interface IContainer {
  width: number
  height: number
}

const props = defineProps({
  width: { type: Number, required: false },
  height: { type: Number, required: false }
})

/** 文本节点 */
const textInputRef = ref<HTMLDivElement>()
const textContainer = reactive<IContainer>({
  width: 0,
  height: 0
})

onMounted(() => {
  if (textInputRef.value) {
    const { width, height } = getSizeByElement(textInputRef.value)
    textContainer.width = width
    textContainer.height = height
  }
})
</script>

<style lang="less" scoped>
.node-foreignObject {
  display: block;
}
</style>
