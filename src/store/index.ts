import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import * as Structure from './../layout/index'
import * as ThemeConfigs from './../theme/index'
import { Theme } from './../theme/Theme'
import { listToTree, transformLayoutType, treeToList } from '@/utils/transform'

const initialClientDate: Omit<IClientNode, 'childIds' | 'children'> = {
  depth: 0,
  width: 0,
  height: 0,
  x: 0,
  y: 0
}

export const useMindMapStore = defineStore('mindMap', () => {
  /** state */
  const state = reactive<IMindMapState>({
    rootNodeId: undefined,
    nodes: [],
    layout: 'RightLogical',
    theme: new Theme()
  })

  /** 挂载数据 */
  function setupData(nodes: IServiceNode[], config: IServiceConfig) {
    state.nodes = nodes.map((item) => ({
      ...item,
      ...initialClientDate,
      children: [],
      childIds: item.children
    }))
    const { layout, theme, children } = config
    state.rootNodeId = children[0]
    state.layout = transformLayoutType(layout)
    state.theme = new Theme(ThemeConfigs[theme.template])
  }

  /** 修改本地视图数据 */
  function setClientNodeAttr<T extends ITreeNode, K extends keyof T>(node: T, key: K, val: T[K]) {
    state.nodes = state.nodes.map((item) => (item.id === node.id ? { ...item, [key]: val } : item))
  }

  /** 批量修改本地视图数据 */
  function setClientNodeAttrs<T extends ITreeNode, K extends Partial<IClientNode>>(
    node: T,
    clientData: K
  ) {
    state.nodes = state.nodes.map((item) =>
      item.id === node.id ? { ...item, ...clientData } : item
    )
  }

  /** 获取节点树类型的数据 */
  const treeNode = computed(() => {
    const tree = listToTree(state.nodes, state.rootNodeId)
    const rootNode = tree[0]
    if (rootNode) {
      const MindMapLayout = Structure[state.layout]
      const layoutOption: Structure.ILayoutOption<ITreeNode> = {
        getWidth: (node) => node.width,
        getHeight: (node) => node.height,
        getHGap: (node) => state.theme.getNodeThemeByDepth(node.depth).marginX || 0,
        getVGap: (node) => state.theme.getNodeThemeByDepth(node.depth).marginY || 0,
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
    state,
    treeNode,
    listNode,
    setupData,
    setClientNodeAttr,
    setClientNodeAttrs
  }
})
