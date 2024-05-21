import type { Ref } from 'vue'

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

/** 节点选择 */
export interface ISelection {
  /** 激活的节点 */
  activeNode: Ref<ITreeNode | undefined>
  /** 节点点击事件 */
  onClick: (ev: MouseEvent, node?: ITreeNode) => void
  /** 取消节点激活 */
  handleActiveCancel: (ev: MouseEvent) => void
}
