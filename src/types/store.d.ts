/**
 * 客户端节点视图数据
 * 本地数据
 */
type IClientNode = INode<
  Omit<IServiceNode, 'children'> & {
    /** 深度 0表示根节点 */
    depth: number
  } & IRect
>

type ITreeNode = INode<
  Omit<IServiceNode, 'children'> & {
    /** 深度 0表示根节点 */
    depth: number
  }
>

/** 布局类型 */
type ILayoutType = keyof typeof import('@/layout/index')

/** 主题类型 */
type IThemeType = keyof typeof import('@/theme/index')

/** store中的state */
interface INodeRectState {
  /** 根节点id */
  rootNodeId?: IServiceNode['id']
  /** 节点list */
  nodes: IClientNode[]
  /** 布局类型 */
  layout: ILayoutType
  /** 主题类型 */
  theme: import('@/theme/Theme').Theme<INodeTheme>
}
