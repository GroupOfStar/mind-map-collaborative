/** 树型节点 */
export type ITreeNode<T extends Record<PropertyKey, any> = {}> = T & {
  /** 子节点 */
  children: ITreeNode<T>[]
}

/** layout布局参数配置 */
export interface ILayoutOption<T extends ITreeNode> {
  /** 获取节点宽度 */
  getWidth(node: T): number
  /** 获取节点高度 */
  getHeight(node: T): number
  /** 获取水平方向上的间距 */
  getHGap(node: T): number
  /** 获取垂直方向上的间距 */
  getVGap(node: T): number

  /** 获取X轴的位置 */
  getX(node: T): number
  /** 设置X轴的位置 */
  setX(node: T, value: number): void
  /** 获取Y轴的位置 */
  getY(node: T): number
  /** 设置Y轴的位置 */
  setY(node: T, value: number): void
}

/** 包装节点 */
export interface IWrapperNode<T> {
  current: T
  index: number
  parent?: T
}

/** 遍历节点 */
export type IForEachNode<T> = (node: T, index: number, parentNode?: T) => void
