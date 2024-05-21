import { defaultTheme } from './default'
import * as ThemeConfigs from './index'

/**
 * 合并主题配置
 * @param theme 使用的主题
 * @param defaultConfig 主题的通用配置
 * @returns 合并后的主题配置
 */
export function mergeTheme<T>(
  theme: Partial<ITheme<T>>,
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

/** 主题 */
export class Theme<T extends Partial<INodeTheme>> implements ITheme<T> {
  /** 当前主题类型 */
  public themeType: IThemeType

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
  public selectedBorderPadding!: number
  public expandBorderWidth?: number
  public expandTBPadding?: number
  public expandLRPadding?: number
  public expandFontSize?: number
  public expandRadius?: number
  public expandOffset?: number

  public root!: Required<T>
  public second!: Required<T>
  public node!: Required<T>
  public generalization!: Required<T>

  constructor(type: IThemeType = 'defaultTheme', config: Partial<ITheme<T>> = {}) {
    this.themeType = type
    const newTheme = mergeTheme(config, ThemeConfigs[type])
    Object.assign(this, newTheme)
  }
  // /** 是否为水平布局 */
  // public get isHorizontal() {
  //   return ['LeftLogical', 'RightLogical', 'Standard'].indexOf(this.layout) > -1
  // }
  /** 获取服务端节点样式，如果没有，返回当前主题的默认样式 */
  public getStyles<K extends ITreeNode>(node: K): Required<T> {
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
