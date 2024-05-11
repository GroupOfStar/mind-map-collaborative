import type { ILayoutOption, ITreeNode } from '../interface'

/** 布局节点 */
export class WrappedTree<T extends ITreeNode> {
  /** 是否水平布局 */
  public static isHorizontal: boolean = true
  /** 水平方向上的间距 */
  public readonly hGap: number
  /** 垂直方向上的间距 */
  public readonly vGap: number
  /** 宽度 */
  public readonly width: number
  /** 高度 */
  public readonly height: number
  /** X轴上的定位 */
  public x = 0
  /** Y轴上的定位 */
  public y = 0
  /** 父节点 */
  private parentWt?: WrappedTree<T>
  /** children数组 */
  public readonly children: WrappedTree<T>[] = []

  constructor(node: T, children: WrappedTree<T>[] = [], layoutOption: ILayoutOption<T>) {
    const { getWidth, getHeight, getHGap, getVGap } = layoutOption
    this.hGap = getHGap(node)
    this.vGap = getVGap(node)

    if (WrappedTree.isHorizontal) {
      this.width = getWidth(node)
      this.height = getHeight(node)
    } else {
      this.width = getHeight(node)
      this.height = getWidth(node)
    }
    // 设置父节点
    children.forEach((item) => (item.parentWt = this))
    this.children = children
  }
  /** children的个数 */
  public get childCount(): number {
    return this.children.length
  }
  /** 获取最后一个子节点 */
  public get lastChild(): WrappedTree<T> {
    return this.children[this.children.length - 1]
  }
  /** 轮廓底部的定位 */
  public get contourBottom(): number {
    if (this.children.length > 0) {
      const { y, height, contourBottom } = this.lastChild
      return Math.max(y + height, contourBottom)
    } else {
      return this.y + this.height
    }
  }
  /** 轮廓高度 */
  public get contourHeight(): number {
    if (this.children.length > 0) {
      const firstChild = this.children[0]
      return this.contourBottom - firstChild.y
    } else {
      return this.height
    }
  }
  /** 轮廓中间位置 */
  public get contourCenter(): number {
    if (this.children.length > 0) {
      const firstChild = this.children[0]
      return firstChild.y + this.contourHeight / 2
    } else {
      return this.contourHeight / 2
    }
  }
  /** 获取上一个轮廓 */
  public get prevContour(): WrappedTree<T> | undefined {
    if (this.parentWt) {
      const fid = this.parentWt.children.findIndex((item) => item === this)
      return fid > 0 ? this.parentWt.children[fid - 1] : this.parentWt.prevContour
    } else {
      return undefined
    }
  }
  /** 获取上一个同级轮廓节点 */
  public getPrevSameLevelContour(deep: number = 0): WrappedTree<T> | undefined {
    if (this.parentWt) {
      const getDeepNode = (pn: WrappedTree<T>, d: number): WrappedTree<T> => {
        return d > 1 ? getDeepNode(pn.lastChild, d - 1) : pn.lastChild
      }
      const fid = this.parentWt.children.findIndex((item) => item === this)
      return fid > 0
        ? getDeepNode(this.parentWt.children[fid - 1], deep)
        : this.parentWt.getPrevSameLevelContour(deep - 1)
    } else {
      return undefined
    }
  }
  /**
   * 从节点树创建布局节点树
   * @param node 节点树
   * @returns 布局节点树
   */
  public static fromNode<T extends ITreeNode>(
    node: T,
    layoutOption: ILayoutOption<T>
  ): WrappedTree<T> {
    return new WrappedTree(
      node,
      node.children.map((item) => WrappedTree.fromNode(item, layoutOption)),
      layoutOption
    )
  }
  /**
   * 转换回
   * @param wt 布局后的节点树
   * @param root 传入的节点树
   */
  public static convertBack<T extends ITreeNode>(
    wt: WrappedTree<T>,
    root: T,
    layoutOption: ILayoutOption<T>
  ) {
    const { setX, setY } = layoutOption
    if (WrappedTree.isHorizontal) {
      setX(root, wt.x)
      setY(root, wt.y)
    } else {
      setX(root, wt.y)
      setY(root, wt.x)
    }
    wt.children.forEach((child, i) => {
      WrappedTree.convertBack(child, root.children[i], layoutOption)
    })
  }
}
