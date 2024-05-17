import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import * as Structure from './../layout/index'
import { Theme } from '@/theme/Theme'
import { listToTree, transformLayoutType, treeToList } from '@/utils/transform'

export const useNodeRectStore = defineStore('nodeRect', () => {
  /** state */
  const state = reactive<INodeRectState>({
    rootNodeId: undefined,
    nodes: [],
    layout: 'RightLogical',
    theme: new Theme<INodeTheme>()
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

    state.theme = new Theme<INodeTheme>(theme.template, JSON.parse(theme.config))
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

  /** 获取布局对象 */
  const mindMapLayout = computed(() => {
    const { nodes, rootNodeId, layout, theme } = state
    const rootTreeNode = listToTree(nodes, rootNodeId)[0]
    const layoutOption: Structure.ILayoutOption<IClientNode> = {
      getWidth: (node) => {
        const { selectedBorderPadding, selectedBorderWidth } = theme
        const { paddingX, borderWidth } = theme.getStyles(node)
        // svg的rect的宽度实际左右从边框的一半开始算的，所以这里没有*2
        return (
          node.width + (paddingX + borderWidth + selectedBorderPadding) * 2 + selectedBorderWidth
        )
      },
      getHeight: (node) => {
        const { selectedBorderPadding, selectedBorderWidth } = theme
        const { paddingY, borderWidth } = theme.getStyles(node)
        // svg的rect的宽度实际左右从边框的一半开始算的，所以这里没有*2
        return (
          node.height + (paddingY + borderWidth + selectedBorderPadding) * 2 + selectedBorderWidth
        )
      },
      getHGap: (node) => theme.getStyles(node).marginX || 0,
      getVGap: (node) => theme.getStyles(node).marginY || 0,
      getX: (node) => node.x,
      setX: (node, val) => {
        node.x = val
      },
      getY: (node) => node.y,
      setY: (node, val) => {
        node.y = val
      }
    }
    return new Structure[layout](layoutOption, rootTreeNode)
  })

  /** 获取画布大小 */
  const graphSize = computed(() => {
    const box = mindMapLayout.value.getBoundingBox()
    console.log('box :>> ', box)
    return { width: isNaN(box.width) ? 0 : box.width, height: isNaN(box.height) ? 0 : box.height }
  })

  /** 获取节点树类型的数据 */
  const rectNodeTree = computed(() => mindMapLayout.value.doLayout())

  /** 视图数据NodeList */
  const rectNodeList = computed(() => treeToList(rectNodeTree.value))

  /** 获取当前节点的DOMRect */
  const getNodeClientRect = computed(() => (id: IServiceNode['id']) => {
    const {
      x = 0,
      y = 0,
      width = 0,
      height = 0
    } = rectNodeList.value.find((item) => item.id === id) || {}
    return { x, y, width, height }
  })

  return {
    state,
    graphSize,
    rectNodeList,
    getNodeClientRect,
    setupData,
    setClientNodeAttr,
    setClientNodeAttrs
  }
})
