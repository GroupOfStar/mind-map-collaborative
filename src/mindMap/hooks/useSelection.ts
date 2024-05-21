import { ref, computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { ISelection } from './interface'

/** 节点选择 */
export function useSelection(): ISelection {
  /** 激活的节点 */
  const activeNode = ref<ITreeNode>()

  /** 选择的节点list */
  const selectedNodeList = ref<ITreeNode[]>([])

  /** 节点点击事件 */
  function onClick(ev: MouseEvent, node?: ITreeNode) {
    ev.stopPropagation()
    activeNode.value = node
  }

  /** 取消节点激活 */
  function handleActiveCancel(ev: MouseEvent) {
    activeNode.value = undefined
  }

  return { activeNode, onClick, handleActiveCancel }
}
