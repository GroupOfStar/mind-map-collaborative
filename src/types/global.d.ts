/** 树型节点 */
type INode<T extends Record<PropertyKey, any> = {}> = T & {
  /** 子节点 */
  children: INode<T>[]
}

/**
 * 下拉项、lookUp、状态的枚举接口
 * @interface IStatusEnum
 * @template T
 */
interface IStatusEnum<T = string> {
  title: string
  value: T
  color?: string
  icon?: string
}

/**
 * 形状位置信息
 */
interface IRect {
  /** 定位x */
  x: number
  /** 定位y */
  y: number
  /** 宽度 */
  width: number
  /** 高度 */
  height: number
}

/**
 * Iframe的通信消息格式
 */
interface IframeMessage {
  /** 指令 */
  action: string
  /** msg */
  msgData?: any
  /** data */
  data?: any
  uuid?: any
  url?: any
  type?: any
}
