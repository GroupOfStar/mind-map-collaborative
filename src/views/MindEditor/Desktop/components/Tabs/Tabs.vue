<template>
  <div class="tabs-wrapper" ref="tabsWrapperRef">
    <section class="tabs-section">
      <div class="section-left"></div>
      <div class="section-center">
        <slot></slot>
      </div>
    </section>
    <article class="tabs-content">
      <aside
        :class="[
          'tabs-aside-left',
          { 'aside-left-visible': !!modelValue && contentPosition === 'left' }
        ]"
      ></aside>
      <main class="tab-content">
        <slot name="content"></slot>
      </main>
      <aside
        :class="[
          'tabs-aside-right',
          { 'aside-right-visible': !!modelValue && contentPosition === 'right' }
        ]"
      ></aside>
    </article>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MindTabs'
}
</script>
<script setup lang="ts" generic="T extends string | undefined">
import { provide, computed, ref } from 'vue'
import type { ComputedRef } from 'vue'
import { TAB_PROVIDE } from './index'
import type { ITabsEmits, ITabsInjection, ITabsProps, ITabPaneProps } from './interface.d'

const props = withDefaults(defineProps<ITabsProps<T>>(), {})

const emits = defineEmits<ITabsEmits<T>>()

const tabsWrapperRef = ref<HTMLDivElement>()
/** 弹窗位置 */
const contentPosition = ref<ITabPaneProps<string>['contentPosition']>()

function onTabChange(paneKey: T, position: ITabPaneProps<string>['contentPosition']) {
  emits('update:modelValue', paneKey)
  contentPosition.value = position
}

const tabInjection = computed<ITabsInjection<T>>(() => ({
  modelValue: props.modelValue,
  disabledList: props.disabled || [],
  onTabChange,
  tabsWrapperRef: tabsWrapperRef.value
}))

provide<ComputedRef<ITabsInjection<T>>>(TAB_PROVIDE, tabInjection)
</script>

<style scoped lang="scss">
.tabs-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  .tabs-section {
    height: 48px;
    position: relative;
    display: flex;
    align-items: center;
    background-color: getCssVar('bg-color');
    border-bottom: getCssVar('border');

    .section-left {
      position: absolute;
      left: 32px;
    }

    .section-center {
      margin: auto;
      display: flex;
      align-items: center;
    }
  }
  .tabs-content {
    flex: 1;
    display: flex;

    .tabs-aside-left,
    .tabs-aside-right {
      width: 0;
      overflow: hidden;
      background-color: getCssVar('bg-color');
      transition: width 0.2s ease-in;
      &.aside-left-visible {
        border-right: getCssVar('border');
        width: 281px;
      }
      &.aside-right-visible {
        border-left: getCssVar('border');
        width: 281px;
      }
    }
    .tab-content {
      flex: 1;
    }
  }
}
</style>
