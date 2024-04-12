import type { DefineComponent } from 'vue'

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

type MindCanvas = DefineComponent<{ width: number }>
