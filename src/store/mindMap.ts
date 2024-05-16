import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useNodeRectStore } from './nodeRect'
import { listToTree, treeToList } from '@/utils/transform'

export const useMindMapStore = defineStore('mindMap', () => {
  /** 服务数据NodeList */
  const serverNodeList = ref<ITreeNode[]>([])

  const nodeRectStore = useNodeRectStore()

  /** 挂载数据 */
  function setupData(nodes: IServiceNode[], config: IServiceConfig) {
    nodeRectStore.setupData(nodes, config)

    const rootTreeNode = listToTree(
      nodes.map<ITreeNode>((item) => ({ ...item, depth: 0, children: [] })),
      nodeRectStore.state.rootNodeId
    )[0]
    serverNodeList.value = rootTreeNode ? treeToList(rootTreeNode) : []
  }

  return { serverNodeList, setupData }
})
