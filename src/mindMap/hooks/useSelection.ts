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

  /** 鼠标左键是否按下 */
  let isLeftMousedown = false
  /** 鼠标左键按下时的起始坐标 */
  const startPosition = { x: 0, y: 0 }
  /** 鼠标抬起时的结束坐标 */
  const endPosition = { x: 0, y: 0 }

  /** 选框器点位信息 */
  const points = ref<string>()

  /** 选择的节点list */
  const selectedNodeList = ref<ITreeNode[]>([])

  /**
   * 画布点击事件
   * 拖拽即 mousedown,mousemove,mouseup 后会触发 画布点击事件
   * 所以需要通过判断位移来区别点击和拖拽逻辑
   */
  function onContainerClick(ev: MouseEvent) {
    const { x: x1, y: y1 } = startPosition
    const { x: x2, y: y2 } = endPosition
    const d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    // 点击逻辑
    if (d <= 4) {
      ev.stopPropagation()
      activeNode.value = undefined
      selectedNodeList.value = []
    }
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
        ev.stopPropagation()
        isLeftMousedown = true
        startPosition.x = ev.clientX
        startPosition.y = ev.clientY
        break
      case 1:
      case 2:
        break
    }
  }

  /** 鼠标移动事件 */
  function onMousemove(ev: MouseEvent) {
    if (isLeftMousedown) {
      ev.stopPropagation()
      const { clientX, clientY } = ev
      const { x, y } = startPosition
      // 左上 右上 右下 左下
      points.value = `${x},${y} ${clientX},${y} ${clientX},${clientY} ${x},${clientY}`
      handleCollisionCheck(x, y, clientX, clientY)
    }
  }

  // 鼠标松开事件, 清除状态
  function onMouseup(ev: MouseEvent) {
    if (isLeftMousedown) {
      ev.stopPropagation()
      isLeftMousedown = false
      endPosition.x = ev.clientX
      endPosition.y = ev.clientY
      points.value = undefined
    }
  }

  return {
    activeNode,
    selectedNodeList,
    points,
    onContainerClick,
    onNodeClick,
    onMousedown,
    onMousemove,
    onMouseup
  }
}
