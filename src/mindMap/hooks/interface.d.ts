import type { ComputedRef } from 'vue'

/** 修改graph定位信息 */
export type ISetGraphPosition = (position: Partial<Pick<IRect, 'x' | 'y'>>) => void

/** 滚动条hook参数 */
export interface IBarScrollOption {
  /** 水平还是垂直类型 */
  type: 'horizontal' | 'vertical'
  /** 偏移量 */
  graphOffset: number
  /** graph图形大小 */
  graphSize: number
  /** 容器大小 */
  containerSize: number
  /** 修改graph定位信息 */
  setGraphPosition: ISetGraphPosition
}

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
