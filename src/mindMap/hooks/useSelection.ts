import { ref } from 'vue'
import type { ComputedRef } from 'vue'
import { forScopeEachTree } from '@/layout/core/utils'
import { throttle } from 'lodash'

/** 节点选择 */
export function useSelection(
  rectNodeTree: ComputedRef<IClientNode>,
  graphRect: ComputedRef<IRect>
) {
  /** 激活的节点 */
  const activeNode = ref<ITreeNode>()

  /** 鼠标按下的状态 */
  const mousedownState = {
    /** 是否左键按下 */
    isLeftMousedown: false,
    /** 左键按下时的起始x */
    startX: 0,
    /** 左键按下时的起始y */
    startY: 0
  }

  /** 选框器点位信息 */
  const points = ref<string>()

  /** 选择的节点list */
  const selectedNodeList = ref<ITreeNode[]>([])

  /** 取消节点激活 */
  function handleActiveCancel(ev: MouseEvent) {
    console.log('handleActiveCancel :', mousedownState.isLeftMousedown)
    ev.stopPropagation()
    activeNode.value = undefined
  }

  /** 节点点击事件 */
  function onNodeClick(ev: MouseEvent, node?: ITreeNode) {
    ev.stopPropagation()
    activeNode.value = node
    selectedNodeList.value = node ? [node] : []
  }

  /** 碰撞相交检测 */
  const handleCollisionCheck = throttle(function (
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) {
    const minX = Math.min(startX, endX)
    const minY = Math.min(startY, endY)
    const maxX = Math.max(startX, endX)
    const maxY = Math.max(startY, endY)

    forScopeEachTree((node) => {
      const min_x = node.x + graphRect.value.x
      const min_y = node.y + graphRect.value.y
      const max_x = node.x + node.width + graphRect.value.x
      const max_y = node.y + node.height + graphRect.value.y

      // 修改相交计算方法，接触到了就选中
      if (minX <= max_x && maxX >= min_x && minY <= max_y && maxY >= min_y) {
        selectedNodeList.value = selectedNodeList.value.concat([node])
        activeNode.value = node
      } else {
        selectedNodeList.value = selectedNodeList.value.filter((item) => item.id !== node.id)
      }
    }, rectNodeTree.value)
  }, 100)

  /** 鼠标按下事件 */
  function onMousedown(ev: MouseEvent) {
    // 0表示左键, 1表示中键, 2表示右键
    switch (ev.button) {
      case 0:
        ev.preventDefault()
        mousedownState.startX = ev.clientX
        mousedownState.startY = ev.clientY
        mousedownState.isLeftMousedown = true
        break
      case 1:
      case 2:
        break
    }
  }

  /** 鼠标移动事件 */
  function onMousemove(ev: MouseEvent) {
    if (mousedownState.isLeftMousedown) {
      ev.stopPropagation()
      const { clientX, clientY } = ev
      const { startX, startY } = mousedownState
      // 左上 右上 右下 左下
      points.value = `${startX},${startY} ${clientX},${startY} ${clientX},${clientY} ${startX},${clientY}`

      handleCollisionCheck(startX, startY, clientX, clientY)
    }
  }

  // 鼠标松开事件, 清除状态
  function onMouseup(ev: MouseEvent) {
    ev.stopPropagation()
    points.value = undefined
    mousedownState.isLeftMousedown = false
    mousedownState.startX = 0
    mousedownState.startY = 0
  }

  return {
    activeNode,
    selectedNodeList,
    points,
    handleActiveCancel,
    onNodeClick,
    onMousedown,
    onMousemove,
    onMouseup
  }
}
