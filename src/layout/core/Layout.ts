import { forScopeEachTree } from './utils'
import type { ITreeNode, ILayoutOption } from '../interface'

export abstract class Layout<T extends ITreeNode> {
  protected rootNode: T
  protected option: ILayoutOption<T>

  constructor(rootNode: T, option: ILayoutOption<T>) {
    this.rootNode = rootNode
    this.option = option
  }
  /** 获取布局类型下的偏移量 */
  protected abstract get offset(): { offsetX: number; offsetY: number }
  /** 布局 */
  public abstract doLayout(): T
  /** 获取节点树的边界框 */
  protected getBoundingBox(rootNode: T) {
    const bb = {
      left: Number.MAX_VALUE,
      top: Number.MAX_VALUE,
      width: 0,
      height: 0
    }
    forScopeEachTree<T>((node) => {
      const { getX, getY } = this.option
      const x = getX(node)
      const y = getY(node)
      // const width = getWidth(node);
      // const height = getHeight(node);

      bb.left = Math.min(bb.left, x)
      bb.top = Math.min(bb.top, y)
      // bb.width = Math.max(bb.width, x + width / 2);
      // bb.height = Math.max(bb.height, y + height / 2);
      bb.width = Math.max(bb.width, x)
      bb.height = Math.max(bb.height, y)
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
