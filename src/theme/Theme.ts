import { defaultTheme } from './default'

export class Theme implements ITheme {
  private static instance?: Theme
  public layout!: ILayoutType
  public imgMaxWidth?: number
  public imgMaxHeight?: number
  public textAutoWrapWidth?: number
  public iconSize?: number
  public lineWidth?: number
  public lineColor?: string
  public lineDasharray?: string
  public lineStyle?: 'curve' | 'straight' | 'direct'
  public generalizationLineWidth?: number
  public generalizationLineColor?: string
  public generalizationLineMargin?: number
  public generalizationNodeMargin?: number
  public backgroundColor?: string
  public backgroundImage?: string
  public backgroundRepeat?: string
  public backgroundPosition?: string
  public backgroundSize?: string
  public nodeUseLineStyle?: boolean
  public fontFamily?: string
  public selectedBorderWidth!: number
  public selectedBorderColor!: string
  public selectedBorderPadding!: number
  public expandBorderWidth?: number
  public expandTBPadding?: number
  public expandLRPadding?: number
  public expandFontSize?: number
  public expandRadius?: number
  public expandOffset?: number

  public root!: INodeTheme
  public second!: INodeTheme
  public node!: INodeTheme
  public generalization!: INodeTheme

  constructor(theme: ITheme = defaultTheme) {
    // 单例模式
    if (Theme.instance) {
      return Theme.instance
    }
    this.layout = theme.layout
    this.useTheme(theme)
    return (Theme.instance = this)
  }
  /**
   * 合并主题配置
   * @param {ITheme} theme 使用的主题
   * @param {ITheme} defaultConfig 主题的通用配置
   * @returns {ITheme} 合并后的主题配置
   */
  public static mergeTheme(
    theme: Partial<ITheme<Partial<INodeTheme>>>,
    defaultConfig: ITheme = defaultTheme
  ): ITheme {
    const { root, second, node, generalization, ...config } = theme
    const {
      root: _root,
      second: _second,
      node: _node,
      generalization: _generalization,
      ..._config
    } = defaultConfig
    return {
      ..._config,
      ...config,
      root: { ..._root, ...root },
      second: { ..._second, ...second },
      node: { ..._node, ...node },
      generalization: { ..._generalization, ...generalization }
    }
  }
  /** 是否为水平布局 */
  public get isHorizontal() {
    return ['LeftLogical', 'RightLogical', 'Standard'].indexOf(this.layout) > -1
  }
  /**
   * 使用某一主题
   * @param theme 目前已有在主题有 蓝色系: blueGray, 商务: deepPurple
   */
  public useTheme(theme: ITheme) {
    const newTheme = Theme.mergeTheme(theme)
    console.log('newTheme :>> ', newTheme)
    Object.assign(this, newTheme)
  }
  /** 获取服务端节点样式，如果没有，返回当前主题的默认样式 */
  public getStyles(node: ITreeNode): INodeTheme {
    switch (node.depth) {
      case 0:
        return { ...this.root, ...node }
      case 1:
        return { ...this.second, ...node }
      default:
        return { ...this.node, ...node }
    }
  }
}
