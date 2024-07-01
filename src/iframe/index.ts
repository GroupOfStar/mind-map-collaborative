import { iframeProvider, FrameMessageHandler } from '@cloud/base-editor-sdk'
import type { IframeOptions, MessageModel } from '@cloud/base-editor-sdk'
import { getTargetOrigin } from '@/utils'

type IMethodType = 'laserPointerFunc' | 'demoModeFunc'

/**
 * Iframe的通信消息格式
 */
interface IframeMessage {
  /** 指令 */
  action: string
  /** data */
  data?: any
}

export const IFRAME_MESSAGE_NAME = 'iframe-message'

export class IframeProvider {
  private model: MessageModel = {}
  private options: IframeOptions
  private _provider?: FrameMessageHandler
  constructor(options: IframeOptions) {
    const from = new URLSearchParams(window.location.search).get('_iffrom') || ''
    console.log('decodeURI(from) :>> ', decodeURI(from))
    this.options = options
  }
  public get provider() {
    if (this._provider) {
      return this._provider
    }
    throw new Error('请先执行 init 方法')
  }
  private set provider(val: FrameMessageHandler) {
    this._provider = val
  }
  public init() {
    return new Promise<FrameMessageHandler>((resolve, reject) => {
      iframeProvider(this.model, this.options)
        .then((provider) => {
          if (provider) {
            this.provider = provider
            provider.respondReady()
            // window.dispatchEvent(
            //   new CustomEvent(IFRAME_MESSAGE_NAME, {
            //     bubbles: true,
            //     cancelable: false,
            //     detail: provider.initialize
            //   })
            // )
            resolve(provider)
          } else {
            parent.postMessage({ action: 'getInit' }, getTargetOrigin())
          }
        })
        .catch(reject)
    })
  }
  public registryAction(action: string, func: Function) {
    this.model[action] = func
  }
}

console.log('&&&&&&&IframeAdapter !!!!')

export const iframe = new IframeProvider({
  allowedHosts: undefined,
  timeout: 3000
})
