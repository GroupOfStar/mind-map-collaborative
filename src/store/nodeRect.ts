import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import * as Structure from './../layout/index'
import { Theme } from '@/theme/Theme'
import * as ThemeConfigs from '@/theme/index'
import { listToTree, transformLayoutType, treeToList } from '@/utils/transform'

export const useNodeRectStore = defineStore('nodeRect', () => {
  /** state */
  const state = reactive<INodeRectState>({
    rootNodeId: undefined,
    nodes: [],
    layout: 'RightLogical',
    theme: new Theme()
  })

  /** 挂载数据 */
  function setupData(nodes: IServiceNode[], config: IServiceConfig) {
    state.nodes = nodes.map<IClientNode>((item) => ({
      ...item,
      depth: 0,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      children: []
    }))
    const { layout, theme, children } = config
    state.rootNodeId = children[0]
    state.layout = transformLayoutType(layout)
    state.theme.useTheme(ThemeConfigs[theme.template])
  }

  /** 修改本地视图数据 */
  function setClientNodeAttr<T extends ITreeNode, K extends keyof T>(
    id: T['id'],
    key: K,
    val: T[K]
  ) {
    state.nodes = state.nodes.map((item) => (item.id === id ? { ...item, [key]: val } : item))
  }

  /** 批量修改本地视图数据 */
  function setClientNodeAttrs<T extends ITreeNode, K extends Partial<IClientNode>>(
    id: T['id'],
    clientData: K
  ) {
    state.nodes = state.nodes.map((item) => (item.id === id ? { ...item, ...clientData } : item))
  }

  /** 获取节点树类型的数据 */
  const treeNode = computed(() => {
    const { nodes, rootNodeId, layout, theme } = state
    const rootTreeNode = listToTree(nodes, rootNodeId)[0]
    if (rootTreeNode) {
      const layoutOption: Structure.ILayoutOption<IClientNode> = {
        getWidth: (node) => {
          const { selectedBorderPadding, selectedBorderWidth } = theme
          const { paddingX, borderWidth } = theme.getStyles(node)
          return (
            node.width + (paddingX + borderWidth + selectedBorderPadding + selectedBorderWidth) * 2
          )
        },
        getHeight: (node) => {
          const { selectedBorderPadding, selectedBorderWidth } = theme
          const { paddingY, borderWidth } = theme.getStyles(node)
          return (
            node.height + (paddingY + borderWidth + selectedBorderPadding + selectedBorderWidth) * 2
          )
        },
        getHGap: (node) => theme.getStyles(node).marginX || 0,
        getVGap: (node) => theme.getStyles(node).marginY || 0,
        getX: (node) => node.x,
        setX: (node, val) => {
          const { selectedBorderPadding, selectedBorderWidth } = theme
          node.x = val + selectedBorderPadding + (selectedBorderWidth * 3) / 2
        },
        getY: (node) => node.y,
        setY: (node, val) => {
          const { selectedBorderPadding, selectedBorderWidth } = theme
          node.y = val + selectedBorderPadding + (selectedBorderWidth * 3) / 2
        }
      }
      const mindMapLayout = new Structure[layout](rootTreeNode, layoutOption)
      const nodeTree = mindMapLayout.doLayout()
      return nodeTree
    } else {
      return undefined
    }
  })

  /** 获取平铺的节点list数据 */
  const listNode = computed(() => (treeNode.value ? treeToList(treeNode.value) : []))

  /** 获取当前节点的DOMRect */
  const getNodeClientRect = computed(() => (id: IServiceNode['id']) => {
    const {
      x = 0,
      y = 0,
      width = 0,
      height = 0
    } = listNode.value.find((item) => item.id === id) || {}
    return { x, y, width, height }
  })

  return { state, getNodeClientRect, setupData, setClientNodeAttr, setClientNodeAttrs }
})
