/**
 * 把节点list转换成节点树
 * @param nodeList
 * @param rootNodeId
 * @returns 节点树
 */
export function listToTree<T extends INode<{ id: string; pid: string; depth: number }>>(
  nodeList: T[],
  rootNodeId?: string
): T[] {
  function treeLoop(nodes: T[], parentId: string, pDeep: number): T[] {
    const children = nodes.filter((item) => item.pid === parentId)
    if (children.length === 0) {
      return []
    } else {
      return children.map((item) => ({
        ...item,
        depth: pDeep + 1,
        children: treeLoop(nodes, item.id, pDeep + 1)
      }))
    }
  }
  const fidRoot = nodeList.find((item) => item.id === rootNodeId)
  return fidRoot ? [{ ...fidRoot, depth: 0, children: treeLoop(nodeList, fidRoot.id, 0) }] : []
}

/**
 * 拍平节点树, 把节点树转换成节点list
 * @param nodeTree 节点树
 * @returns 拍平后是节点数组
 */
export function treeToList<T extends INode>(nodeTree: T): T[] {
  return nodeTree.children.reduce(
    (total, item) => [...total, ...(treeToList(item) as T[])],
    [{ ...nodeTree }]
  )
}

/** 把服务端返回的布局类型数据转换成代码中已有的布局类型 */
export function transformLayoutType(layout?: IServiceLayout): ILayoutType {
  switch (layout) {
    case 'logicalStructure':
      return 'RightLogical'
    // case 'LeftLogical':
    //   config.layout = 'LeftLogical'
    //   break
    // case 'TopLogical':
    //   config.layout = 'TopLogical'
    //   break
    // case 'BottomLogical':
    //   config.layout = 'BottomLogical'
    //   break
    default:
      return 'RightLogical'
  }
}
