import type { IForEachNode, ITreeNode, IWrapperNode } from '../interface'

/**
 * 广度优先
 * 遍历节点及子节点 by while
 * @param callback 遍历时执行的回调
 * @param node 当前节点
 */
export function forScopeEachTree<T extends ITreeNode>(callback: IForEachNode<T>, node: T) {
  const nodeList: IWrapperNode<T>[] = []
  const stack: IWrapperNode<T>[] = [{ current: node, index: 0 }]
  while (stack.length) {
    const item = stack.shift()!
    nodeList.push(item)
    callback(item.current, item.index, item.parent)
    for (let i = 0; i < item.current.children.length; i++) {
      stack.push({
        current: item.current.children[i] as T,
        index: i,
        parent: item.current
      })
    }
  }
}
