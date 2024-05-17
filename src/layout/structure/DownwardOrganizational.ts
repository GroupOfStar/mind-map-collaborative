import { Layout, nonLayeredTidyTree, WrappedTree } from './../core'
import type { ITreeNode } from '../interface'

export class DownwardOrganizational<T extends ITreeNode> extends Layout<T> {
  protected get offset() {
    return {
      offsetX: window.innerWidth / 2,
      offsetY: window.innerHeight / 3
    }
  }
  public doLayout() {
    const wt = nonLayeredTidyTree(this.rootNode, false, this.option)
    WrappedTree.convertBack(wt, this.rootNode, this.option)
    return this.rootNode
  }
}
