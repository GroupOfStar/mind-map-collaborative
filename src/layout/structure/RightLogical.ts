import { Layout, nonLayeredTidyTree, WrappedTree } from './../core'
import type { ITreeNode } from '../interface'

export class RightLogical<T extends ITreeNode> extends Layout<T> {
  public isHorizontal = true

  protected get offset() {
    return {
      offsetX: window.innerWidth / 3,
      offsetY: window.innerHeight / 2
    }
  }
  public doLayout() {
    const wt = nonLayeredTidyTree(this.rootNode, this.isHorizontal, this.option)
    WrappedTree.convertBack(wt, this.rootNode, this.option)
    const offset = this.getLayoutOffset(this.rootNode)
    this.translate(this.rootNode, -offset.x, -offset.y)
    return this.rootNode
  }
}
