import type { ComputedRef } from 'vue'

/**
 * 滚动条信息
 */
export interface IScroll {
  /** 偏移量 */
  offset: ComputedRef<number>
  /** 滚动条大小 */
  size: ComputedRef<number>
  /** 鼠标按下事件 */
  onMousedown: (ev: MouseEvent) => void
  /** 鼠标移动事件 */
  onMousemove: (ev: MouseEvent) => void
  /** 鼠标松开事件 */
  onMouseup: (ev: MouseEvent) => void
}
