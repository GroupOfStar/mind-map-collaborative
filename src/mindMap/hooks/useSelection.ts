import { ref, computed, reactive } from 'vue'

/** 节点选择 */
export function useSelection() {
  /** 激活的节点 */
  const activeNode = ref<ITreeNode>()

  /** 鼠标按下的状态 */
  const mousedownState = reactive({
    /** 是否左键按下 */
    isLeftMousedown: false,
    /** 左键按下时的起始x */
    startX: 0,
    /** 左键按下时的起始y */
    startY: 0
  })

  /** 选框器点位信息 */
  const points = ref<string>()

  /** 选择的节点list */
  const selectedNodeList = ref<ITreeNode[]>([])

  /** 取消节点激活 */
  function handleActiveCancel(ev: MouseEvent) {
    ev.stopPropagation()
    activeNode.value = undefined
  }

  /** 节点点击事件 */
  function onNodeClick(ev: MouseEvent, node?: ITreeNode) {
    ev.stopPropagation()
    activeNode.value = node
  }

  /** 鼠标按下事件 */
  function onMousedown(ev: MouseEvent) {
    // 0表示左键, 1表示中键, 2表示右键
    switch (ev.button) {
      case 0:
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
    points,
    handleActiveCancel,
    onNodeClick,
    onMousedown,
    onMousemove,
    onMouseup
  }
}
