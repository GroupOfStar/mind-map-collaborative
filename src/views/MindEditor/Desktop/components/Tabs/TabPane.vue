<template>
  <Teleport :to="sectionTeleportEl">
    <el-tooltip
      :disabled="!labelTipContent"
      :content="labelTipContent"
      placement="bottom"
      transition="none"
      :hide-after="0"
    >
      <div
        class="tab-icon-wrapper"
        :class="{ active: injection.modelValue === paneKey, disabled }"
        @click="onTabPaneShow"
      >
        <i :class="['icon-mind', labelIcon]"></i>
        <span v-if="labelText">{{ labelText }}</span>
      </div>
    </el-tooltip>
  </Teleport>

  <Teleport v-if="!disabled" :to="contentTeleportEl">
    <div class="tab-pane" v-show="injection.modelValue === paneKey">
      <div class="pane-header">
        <div class="header-title">{{ contentTitle }}</div>
        <div class="close-btn">
          <i class="icon-mind icon-guanbi-24px" @click="onTabPaneClose"></i>
        </div>
      </div>
      <div class="pane-content">
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
export default {
  name: 'MindTabPane'
}
</script>
<script setup lang="ts" generic="T extends string">
import { computed, watch } from 'vue'
import type { ITabPaneProps } from './interface.d'
import { useInjection } from './useInjection'

const props = withDefaults(defineProps<ITabPaneProps<T>>(), {
  labelPosition: 'center',
  contentPosition: 'right'
})
const { injection, sectionTeleportEl } = useInjection(computed(() => props.labelPosition))

const disabled = computed(() => injection.value.disabledList.includes(props.paneKey))

const contentTeleportEl = computed(() => {
  const tabsWrapperRef = injection.value.tabsWrapperRef
  if (!tabsWrapperRef) {
    return 'body'
  }
  switch (props.contentPosition) {
    case 'left':
      return tabsWrapperRef.querySelector('.tabs-aside-left')
    case 'right':
    default:
      return tabsWrapperRef.querySelector('.tabs-aside-right')
  }
})

watch(
  [() => props.contentPosition, () => injection.value.modelValue],
  ([position, val]) => {
    if (val === props.paneKey) {
      injection.value.onTabChange(val, position)
    }
  },
  {
    immediate: true
  }
)

// 显示Pane
const onTabPaneShow = (_event: MouseEvent) => {
  // 禁用列表里的图标不执行
  if (!disabled.value) {
    injection.value.onTabChange(props.paneKey, props.contentPosition)
  }
}

// 隐藏Pane
const onTabPaneClose = (event: MouseEvent) => {
  event.stopPropagation()
  injection.value.onTabChange(undefined, undefined)
}
</script>

<style scoped lang="scss">
.tab-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px;
  border-radius: 12px;
  background-color: getCssVar('bg-color');
  cursor: pointer;

  .icon-mind {
    font-size: 20px;
  }

  &.disabled {
    color: getCssVar('text-color', 'disabled');
    &:hover {
      background-color: getCssVar('bg-color');
    }
  }
  &:hover {
    background-color: getCssVar('fill-color');
  }
  &.active {
    color: var(--el-color-primary);
    background-color: #1476ff1a;
  }
}
.tab-pane {
  padding: 12px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  .pane-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header-title {
      font-family: getCssVar('font-family', 'medium');
      font-size: getCssVar('font-size', 'medium');
      color: getCssVar('color', 'black');
    }
    .close-btn {
      padding: 6px;
      border-radius: 12px;
      cursor: pointer;
      &:hover {
        background-color: getCssVar('fill-color');
      }
      &:active {
        background-color: getCssVar('fill-color', 'dark');
      }
    }
  }
  .pane-content {
    overflow-x: hidden;
  }
  .content {
    width: 232px;
    // 展示侧边栏存在标题，给负margin-top
    margin: -16px auto 0;
    .tab-title {
      position: absolute;
      font-size: 16px;
      line-height: 22px;
      color: var(--el-color-black);
      left: 24px;
      top: 21px;
    }
    .title {
      font-size: 14px;
      padding: 12px 0 8px;
      line-height: 20px;
      margin-top: 16px;
    }
    .sub-title {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
      line-height: 20px;
      padding: 12px 0 8px;
    }
  }
}
</style>
