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
        v-if="!slots.customTab"
        class="tab-icon-wrapper"
        :class="{ active: injection.modelValue === paneKey, disabled }"
        @click="onTabPaneClick"
      >
        <i :class="['icon-mind', labelIcon]"></i>
        <span v-if="labelText">{{ labelText }}</span>
      </div>
      <slot v-else name="customTab"></slot>
    </el-tooltip>
  </Teleport>

  <Teleport v-if="!disabled && hasContent" :to="contentTeleportEl">
    <div class="tab-pane-wrapper" v-show="injection.modelValue === paneKey">
      <div class="tab-pane" v-if="!slots.customTabPane">
        <div class="pane-title">
          {{ contentTitle }}
        </div>
        <div class="pane-content">
          <slot></slot>
        </div>
      </div>
      <slot v-else name="customTabPane"></slot>
      <div class="close-btn">
        <i class="icon-mind icon-guanbi-24px" @click="onTabPaneClose"></i>
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
import { computed, watch, useSlots } from 'vue'
import type { ITabPaneProps } from './interface.d'
import { useInjection } from './useInjection'

const props = withDefaults(defineProps<ITabPaneProps<T>>(), {
  labelPosition: 'center',
  contentPosition: 'right'
})
const { injection, sectionTeleportEl } = useInjection(computed(() => props.labelPosition))

const slots = useSlots()

const disabled = computed(() => injection.value.disabledList.includes(props.paneKey))

/** 是否有内容 */
const hasContent = computed(
  () => (!!slots.default && !!props.contentTitle) || !!slots.customTabPane
)

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

/** TabPane点击 */
const onTabPaneClick = (ev: MouseEvent) => {
  ev.stopPropagation()
  injection.value.onTabsClick(props.paneKey, props.contentPosition)
  // 禁用列表里的图标 和 无内容的 tabPane不执行
  if (!disabled.value && hasContent.value) {
    injection.value.onTabChange(props.paneKey, props.contentPosition)
  }
}

/** 隐藏Pane */
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
.tab-pane-wrapper {
  margin: 12px 24px;
  position: relative;
  .close-btn {
    position: absolute;
    top: 0;
    right: 0;
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
  .tab-pane {
    display: flex;
    flex-direction: column;
    gap: 24px;
    .pane-title {
      height: 37px;
      line-height: 37px;
      font-family: getCssVar('font-family', 'medium');
      font-size: getCssVar('font-size', 'medium');
      color: getCssVar('color', 'black');
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
}
</style>
