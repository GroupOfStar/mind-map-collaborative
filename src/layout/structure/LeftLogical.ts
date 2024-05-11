import { Layout, nonLayeredTidyTree, WrappedTree } from './../core'

export class LeftLogical<T extends ITreeNode> extends Layout<T> {
  protected get offset() {
    return {
      offsetX: (window.innerWidth * 2) / 3,
      offsetY: window.innerHeight / 2
    }
  }
  public doLayout() {
    const wt = nonLayeredTidyTree(this.rootNode, true, this.option)
    WrappedTree.convertBack(wt, this.rootNode, this.option)
    const bb = this.getBoundingBox(this.rootNode)
    this.right2left(this.rootNode, bb)
    return this.rootNode
  }
}
