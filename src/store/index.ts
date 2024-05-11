import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import * as Structure from './../layout/index'
import { listToTree, treeToList } from '@/utils/transform'

const initialClientDate: Omit<IClientNode, 'childIds' | 'children'> = {
  depth: 0,
  width: 0,
  height: 0,
  marginX: 0,
  marginY: 0,
  x: 0,
  y: 0
}

export const useMindMapStore = defineStore('mindMap', () => {
  const nodes = ref<ITreeNode[]>([])
  const config = ref<ITreeConfig>({ id: '', layout: 'RightLogical', children: [] })

  /** 挂载数据 */
  function setupData(arr: IServiceNode[], conf: IServiceConfig) {
    console.log('arr :>> ', arr)
    console.log('conf :>> ', conf)
    nodes.value = arr.map((item) => ({
      ...item,
      ...initialClientDate,
      children: [],
      childIds: item.children
    }))
    config.value = {
      ...conf,
      layout: 'RightLogical'
    }
  }

  /** 修改本地视图数据 */
  function setClientNodeAttr<T extends ITreeNode, K extends keyof T>(node: T, key: K, val: T[K]) {
    nodes.value = nodes.value.map((item) => (item.id === node.id ? { ...item, [key]: val } : item))
  }

  /** 批量修改本地视图数据 */
  function setClientNodeAttrs<T extends ITreeNode, K extends Partial<IClientNode>>(
    node: T,
    clientData: K
  ) {
    nodes.value = nodes.value.map((item) =>
      item.id === node.id ? { ...item, ...clientData } : item
    )
  }

  /** 获取节点树类型的数据 */
  const treeNode = computed(() => {
    const tree = listToTree(nodes.value, config.value.children[0])
    const rootNode = tree[0]
    if (rootNode) {
      const MindMapLayout = Structure[config.value.layout]
      const layoutOption: Structure.ILayoutOption<ITreeNode> = {
        getWidth: (node) => node.width,
        getHeight: (node) => node.height,
        getHGap: (node) => node.marginX,
        getVGap: (node) => node.marginY,
        getX: (node) => node.x,
        setX: (node, val) => {
          node.x = val
        },
        getY: (node) => node.y,
        setY: (node, val) => {
          node.y = val
        }
      }
      const layout = new MindMapLayout(rootNode, layoutOption)
      const nodeTree = layout.doLayout()
      return nodeTree
    } else {
      return undefined
    }
  })

  /** 获取平铺的节点list数据 */
  const listNode = computed(() => (treeNode.value ? treeToList(treeNode.value) : []))

  return {
    treeNode,
    listNode,
    setupData,
    setClientNodeAttr,
    setClientNodeAttrs
  }
})
