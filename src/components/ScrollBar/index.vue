<template>
  <div class="scrollbar-track track-x" :style="{ width: `${width}px` }">
    <div
      class="scrollbar-thumb"
      :style="{ width: `${scrollRect.width}px`, left: `${scrollRect.x}px` }"
    ></div>
  </div>
  <div class="scrollbar-track track-y" :style="{ height: `${height}px` }">
    <div
      class="scrollbar-thumb"
      :style="{ height: `${scrollRect.height}px`, top: `${scrollRect.y}px` }"
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
  /** 滚动条图形位置 */
  scrollRect: {
    type: Object as PropType<IRect>,
    required: true
  }
})
</script>

<style lang="less" scoped>
.scrollbar-track {
  position: absolute;
  .scrollbar-thumb {
    position: relative;
    background: #e5e5e5;
    border-radius: 4px;
  }

  &.track-x {
    padding: 1px 0;
    bottom: 0;
    height: 10px;

    .scrollbar-thumb {
      height: 8px;
    }
  }
  &.track-y {
    padding: 0 1px;
    top: 0;
    right: 0;
    width: 10px;
    .scrollbar-thumb {
      width: 8px;
    }
  }
}
</style>
