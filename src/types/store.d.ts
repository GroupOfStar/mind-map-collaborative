/**
 * 客户端节点视图数据
 * 本地数据
 */
interface IClientNode {
  /** 深度 0表示根节点 */
  depth: number
  /** 宽度 */
  width: number
  /** 高度 */
  height: number
  /** 定位x */
  x: number
  /** 定位y */
  y: number
  /** 子节点 */
  children: IClientNode[]
  /** 子节点id的数组 */
  childIds: string[]
}

type ITreeNode = INode<Omit<IServiceNode, 'children'> & IClientNode>

/** 布局类型 */
type ILayoutType = keyof typeof import('@/layout/index')

/** 主题类型 */
type IThemeType = keyof typeof import('@/theme/index')

/** store中的state */
interface IMindMapState {
  /** 根节点id */
  rootNodeId?: ITreeNode['id']
  /** 节点list */
  nodes: ITreeNode[]
  /** 布局类型 */
  layout: ILayoutType
  /** 主题类型 */
  theme: import('@/theme/Theme').Theme
}
