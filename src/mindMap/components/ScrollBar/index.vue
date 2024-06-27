<template>
  <div class="scrollbar-track track-x" :style="{ width: `${width}px` }">
    <div
      class="scrollbar-thumb"
      :style="{ width: `${scrollX.size.value}px`, left: `${scrollX.offset.value}px` }"
      @mousedown="scrollX.onMousedown"
    ></div>
  </div>
  <div class="scrollbar-track track-y" :style="{ height: `${height}px` }">
    <div
      class="scrollbar-thumb"
      :style="{ height: `${scrollY.size.value}px`, top: `${scrollY.offset.value}px` }"
      @mousedown="scrollY.onMousedown"
    ></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ScrollBar'
}
</script>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { IScroll } from './interface.d'

defineProps({
  /** 滚动条轨道宽度 */
  width: {
    type: Number,
    required: true
  },
  /** 滚动条轨道高度 */
  height: {
    type: Number,
    required: true
  },
  /** x滚动条图形位置 */
  scrollX: {
    type: Object as PropType<IScroll>,
    required: true
  },
  /** y滚动条图形位置 */
  scrollY: {
    type: Object as PropType<IScroll>,
    required: true
  }
})
</script>

<style scoped lang="scss">
.scrollbar-track {
  position: absolute;
  .scrollbar-thumb {
    position: relative;
    background-color: #e5e5e5;
    border-radius: 4px;
    &:hover {
      background-color: #cbcbcb;
    }
    &:active {
      background-color: #999;
    }
  }

  &.track-x {
    padding: 4px 0;
    bottom: 0;
    height: 16px;

    .scrollbar-thumb {
      height: 8px;
    }
  }
  &.track-y {
    padding: 0 4px;
    top: 0;
    right: 0;
    width: 16px;
    .scrollbar-thumb {
      width: 8px;
    }
  }
}
</style>
