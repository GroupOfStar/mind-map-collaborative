/** Tabs的Injection对象 */
export interface ITabsInjection<T extends string | undefined> {
  modelValue: T
  disabledList: Omit<T, undefined>[]
  onTabChange: (paneKey: T, contentPosition: ITabPaneProps['contentPosition']) => void
  tabsWrapperRef?: HTMLDivElement
}

export interface ITabsProps<T extends string | undefined> {
  modelValue: T
  disabled?: T[]
}
export interface ITabsEmits<T extends string | undefined> {
  (e: 'update:modelValue', val?: T): void
}

export type Position = 'left' | 'center' | 'right'

export interface ITabPaneProps<T extends string> {
  paneKey: T
  labelIcon?: string
  labelText?: string
  labelPosition?: Position
  labelTipContent?: string
  contentTitle: string
  contentPosition?: 'left' | 'right'
}

export interface ITabPaneLineProps {
  labelPosition?: Position
}
