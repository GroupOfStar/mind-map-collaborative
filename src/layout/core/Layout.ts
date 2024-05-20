import { forScopeEachTree } from './utils'
import type { ITreeNode, ILayoutOption } from '../interface'

export abstract class Layout<T extends ITreeNode> {
  /** 是否为水平方向 */
  public abstract isHorizontal: boolean
  protected option: ILayoutOption<T>
  protected rootNode: T

  constructor(option: ILayoutOption<T>, rootNode: T = { children: [] } as any) {
    this.option = option
    this.rootNode = rootNode
  }
  /** 获取布局类型下的偏移量 */
  protected abstract get offset(): { offsetX: number; offsetY: number }
  /** 布局 */
  public abstract doLayout(): T
  /** 获取布局偏移量 */
  protected getLayoutOffset(rootNode: T) {
    function loop<T extends ITreeNode>(nodeTree: T): T[] {
      const fid = nodeTree.children[0]
      if (fid) {
        return [nodeTree, ...(loop(fid) as T[])]
      } else {
        return [nodeTree]
      }
    }
    const outerNodeList = loop(rootNode)
    const minY = Math.min(...outerNodeList.map(this.option.getY))
    return { x: this.option.getX(rootNode), y: minY }
  }
  /** 获取节点树的边界框 */
  public getBoundingBox(rootNode: T) {
    const bb = {
      left: Number.MAX_VALUE,
      top: Number.MAX_VALUE,
      width: 0,
      height: 0
    }
    forScopeEachTree<T>((node) => {
      const { getX, getY, getWidth, getHeight } = this.option
      const x = getX(node)
      const y = getY(node)
      const width = getWidth(node)
      const height = getHeight(node)

      bb.left = Math.min(bb.left, x)
      bb.top = Math.min(bb.top, y)
      bb.width = Math.max(bb.width, x + width)
      bb.height = Math.max(bb.height, y + height)
      // bb.width = Math.max(bb.width, x)
      // bb.height = Math.max(bb.height, y)
    }, rootNode)
    return bb
  }
  /** 节点横坐标由右变成左 */
  protected right2left(rootNode: T, boundingBox: ReturnType<Layout<T>['getBoundingBox']>) {
    forScopeEachTree<T>((node) => {
      const { getX, setX } = this.option
      const x = getX(node)
      setX(node, -x + boundingBox.width)
    }, rootNode)
  }
  /** 节点纵坐标由下变成上 */
  protected down2up(rootNode: T, boundingBox: ReturnType<Layout<T>['getBoundingBox']>) {
    forScopeEachTree((node) => {
      const { getY, setY } = this.option
      const y = getY(node)
      setY(node, -y + boundingBox.height)
    }, rootNode)
  }
  /** 节点树整体偏移 */
  protected translate(rootNode: T, tx = 0, ty = 0) {
    forScopeEachTree<T>((node) => {
      const { getX, setX, getY, setY } = this.option
      setX(node, getX(node) + tx)
      setY(node, getY(node) + ty)
    }, rootNode)
  }
}
