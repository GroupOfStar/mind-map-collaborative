/** 树型节点 */
type INode<T extends Record<PropertyKey, any> = {}> = T & {
  /** 子节点 */
  children: INode<T>[]
}

interface IClientNode {
  /** 深度 0表示根节点 */
  depth: number
  /** 宽度 */
  width: number
  /** 高度 */
  height: number
  marginX: number
  marginY: number
  x: number
  y: number
  /**  */
  children: IClientNode[]
  /**  */
  childIds: string[]
}

type ITreeNode = INode<Omit<IServiceNode, 'children'> & IClientNode>

/** 布局类型 */
type ILayoutType =
  | 'Standard'
  | 'DownwardOrganizational'
  | 'UpwardOrganizational'
  | 'LeftLogical'
  | 'RightLogical'

interface ITreeConfig extends IServiceConfig {
  layout: ILayoutType
}
