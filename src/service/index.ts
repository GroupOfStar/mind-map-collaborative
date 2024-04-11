import {
  WebWorkerIndexedDBStore,
  defaultUpdateStore,
  DocumentId,
  createSyncDocumentFactory,
  AggregationModelName
} from '@cloud/collaborative-client'
import type {
  SyncDocumentFactory,
  SyncDocumentFactoryProps,
  WSDocumentPluginProps,
  EditorSceneOptions,
  DocumentChanges
} from '@cloud/collaborative-client'
import { defaultConfModel, defaultNodeModel, MindAggregationModel } from './model'
import { config } from './config'
import { convertToTree, extractConfAndNodes, filterActiveNodes, simpleDeepClone } from '@/utils'
import { throttle } from 'lodash'

/** 协同配置 */
export interface ICollaborativeOpt {
  /** 文档id */
  docId?: string
  /** 协同场景 */
  scene: EditorSceneOptions
  /** 用户信息 */
  authenticate: SyncDocumentFactoryProps['authenticate']
  /** 协同文档插件配置 */
  WSDocumentPlugin?: WSDocumentPluginProps
}

export class CollaborativeRequest {
  /** 文档id */
  private _docId?: string
  /** 协同服务 */
  private _factory?: SyncDocumentFactory
  constructor() {}
  /** 文档id */
  private get docId() {
    if (this._docId) {
      return this._docId
    }
    throw new Error('请先执行 init 方法')
  }
  private set docId(val: string) {
    this._docId = val
  }
  /** 协同服务 */
  private get factory() {
    if (this._factory) {
      return this._factory
    }
    throw new Error('请先执行 init 方法')
  }
  private set factory(val: SyncDocumentFactory) {
    this._factory = val
  }
  /**
   * 接入协同
   * @param options 接入配置
   */
  public init(options: ICollaborativeOpt) {
    this.docId = options.docId || ''
    const modelName = AggregationModelName('mind')
    const documentId = new DocumentId(modelName, options.docId)
    const factoryProps: SyncDocumentFactoryProps = {
      // 使用默认的localStorage存储更新信息
      localStore: window && window.Worker ? new WebWorkerIndexedDBStore() : defaultUpdateStore,
      models: {
        conf: defaultConfModel,
        mind: defaultNodeModel,
        [modelName]: MindAggregationModel
      },
      scene: options.scene,
      authenticate: options.authenticate,
      // 多文档聚合为单个文档的转换规则
      aggregationTransformer: (id: DocumentId) => ({
        target: documentId,
        proxyId: id,
        isDocumentCreate: false
      })
    }
    // 协同模式还是离线模式
    if (options.WSDocumentPlugin?.disable) {
      this.factory = createSyncDocumentFactory(factoryProps)
    } else {
      this.factory = createSyncDocumentFactory({
        ...factoryProps,
        pluginConfig: {
          WSDocumentPlugin: {
            ...options.WSDocumentPlugin,
            awarenessDebounceMs: 100 // awareness防抖间隔默认为100
          }
        }
      })
    }
  }
  // 有协同，启用监听
  // 全局数据协同-> 用户名，用户信息，用户头像，聚焦节点
  public registryAwareNess() {
    const configDocId = DocumentId.from(config.confModel, this.docId)
    this.factory.getAwareness(configDocId).then((awareness) => {
      console.log('awareness :>> ', awareness)
      awareness.addListener((data) => {
        console.log('awareness addListener data :>> ', data)
      })
    })
  }
  // 协同数据更新
  private handleUpdate(changes: DocumentChanges) {
    const doc = changes.document.toJSON()
    const [conf, nodes] = extractConfAndNodes(doc)
    const data = filterActiveNodes(nodes, conf)
    data.push(conf)
    const treeData = simpleDeepClone(convertToTree(data))
    console.log('treeData :>> ', treeData)
  }
  // 数据监听
  public factoryAddListener() {
    // 更新防抖200毫秒
    const updateListener = throttle(this.handleUpdate.bind(this), 200)
    // 协同数据监听
    this.factory.addUpdateListener(updateListener)
    // 手动获取协同数据, 其会触发一次协同数据监听 即 this.handleUpdate方法
    this.factory.active(DocumentId.from('_agg_mind', this.docId))
  }
  /** 撤销 */
  public undo() {
    return this.factory.getUndoController(this.docId).undo()
  }
  /** 还原 */
  public redo() {
    return this.factory.getUndoController(this.docId).redo()
  }
}

export const collaborate = new CollaborativeRequest()
