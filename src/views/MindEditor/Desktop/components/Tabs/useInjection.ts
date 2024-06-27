import { computed, inject } from 'vue'
import type { ComputedRef } from 'vue'
import { TAB_PROVIDE } from './index'
import type { ITabsInjection, Position } from './interface.d'

/** 依赖注入 */
export function useInjection(sectionPosition: ComputedRef<Position>) {
  // tabs组件注入过来的数据
  const injection = inject<ComputedRef<ITabsInjection<string | undefined>>>(
    TAB_PROVIDE,
    computed(() => ({
      modelValue: undefined,
      disabledList: [],
      onTabChange: () => {},
      tabsWrapperRef: undefined
    }))
  )

  const sectionTeleportEl = computed(() => {
    const tabsWrapperRef = injection.value.tabsWrapperRef
    if (!tabsWrapperRef) {
      return 'body'
    }
    switch (sectionPosition.value) {
      case 'left':
        return tabsWrapperRef.querySelector('.section-left')
      default:
      case 'center':
        return tabsWrapperRef.querySelector('.section-center')
    }
  })

  return { injection, sectionTeleportEl }
}
