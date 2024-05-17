import { Layout, nonLayeredTidyTree, WrappedTree } from './../core'
import type { ITreeNode } from '../interface'

export class Standard<T extends ITreeNode> extends Layout<T> {
  protected get offset() {
    return {
      offsetX: window.innerWidth / 2,
      offsetY: window.innerHeight / 2
    }
  }
  public doLayout() {
    // // separate into left and right trees
    // const leftTree = new RootNode({ nodeData: this.rootNode.nodeData })
    // const rightTree = new RootNode({ nodeData: this.rootNode.nodeData })
    // const treeSize = this.rootNode.children.length
    // const rightTreeSize = Math.round(treeSize / 2)
    // for (let i = 0; i < treeSize; i++) {
    //   const child = this.rootNode.children[i]
    //   if (i < rightTreeSize) {
    //     rightTree.children.push(child)
    //   } else {
    //     leftTree.children.push(child)
    //   }
    // }
    // // do layout for left and right trees
    // const rightWt = nonLayeredTidyTree(rightTree, true, this.option)
    // WrappedTree.convertBack(rightWt, rightTree, this.option)
    // const leftWt = nonLayeredTidyTree(leftTree, true, this.option)
    // WrappedTree.convertBack(leftWt, leftTree, this.option)
    // this.right2left(leftTree, this.getBoundingBox(leftTree))
    // // combine left and right trees
    // this.translate(
    //   rightTree,
    //   leftTree.shape.x - rightTree.shape.x,
    //   leftTree.shape.y - rightTree.shape.y
    // )
    // // translate rootNode
    // this.rootNode.shape.x = leftTree.shape.x
    // this.rootNode.shape.y = rightTree.shape.y
    // const bb = this.getBoundingBox(this.rootNode)
    // if (bb.top < 0) {
    //   this.translate(this.rootNode, 0, -bb.top)
    // }
    return this.rootNode
  }
}
