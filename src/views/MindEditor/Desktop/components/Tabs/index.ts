import type { InjectionKey } from 'vue'
import type { ITabsInjection } from './interface.d'

export const TAB_PROVIDE: InjectionKey<ITabsInjection<string>> = Symbol('TAB_PROVIDE')

export { default as Tabs } from './Tabs.vue'
export { default as TabPane } from './TabPane.vue'
export { default as TabPaneLine } from './TabPaneLine.vue'
