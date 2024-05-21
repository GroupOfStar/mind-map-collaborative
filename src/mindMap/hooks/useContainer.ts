import { ref, reactive } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { ISetGraphPosition } from './interface'
import { debounce } from 'lodash'

export function useContainer(
  containerRef: Ref<HTMLDivElement | undefined>,
  graphRect: ComputedRef<IRect>,
  setGraphPosition: ISetGraphPosition
) {
  /** 是否右键按下 */
  const isRightMousedown = ref(false)

  /** container图形位置信息 */
  const containerRect = reactive<IRect>({ x: 0, y: 0, width: 0, height: 0 })

  /**
   * 设置鼠标样式
   * @param cursor grab: 手, grabbing: 抓手, default: 默认鼠标
   */
  function setContainerCursor(cursor: 'grab' | 'grabbing' | 'default') {
    if (containerRef.value) {
      containerRef.value.style.cursor = cursor
    }
  }

  /** 鼠标按下事件 */
  function onMousedown(ev: MouseEvent) {
    // 0表示左键, 1表示中键, 2表示右键
    switch (ev.button) {
      case 0:
      case 1:
        break
      case 2:
        ev.stopPropagation()
        isRightMousedown.value = true
        setContainerCursor('grab')
        break
    }
  }

  /** 图形滚动 */
  function handleGraphMove(movementX: number, movementY: number) {
    let newPositionX = graphRect.value.x + movementX
    let newPositionY = graphRect.value.y + movementY
    // 边界点
    const startX = -graphRect.value.width / 2
    const startY = -graphRect.value.height / 2
    const endX = containerRect.width - graphRect.value.width / 2
    const endY = containerRect.height - graphRect.value.height / 2
    if (newPositionX <= startX) {
      newPositionX = startX
    } else if (newPositionX >= endX) {
      newPositionX = endX
    }
    setGraphPosition({ x: newPositionX })

    if (newPositionY <= startY) {
      newPositionY = startY
    } else if (newPositionY >= endY) {
      newPositionY = endY
    }
    setGraphPosition({ y: newPositionY })
  }

  /** 鼠标移动事件 */
  function onMousemove(ev: MouseEvent) {
    if (isRightMousedown.value) {
      ev.stopPropagation()
      setContainerCursor('grabbing')
      handleGraphMove(ev.movementX, ev.movementY)
    }
  }

  /** 鼠标松开事件, 清除状态 */
  function onMouseup(ev: MouseEvent) {
    if (isRightMousedown.value) {
      ev.stopPropagation()
      setContainerCursor('default')
      isRightMousedown.value = false
    }
  }

  /** 鼠标滚轮事件 */
  function onWheel(ev: WheelEvent) {
    ev.preventDefault()
    ev.stopPropagation()
    if (ev.shiftKey) {
      handleGraphMove(-ev.deltaY, 0)
    } else {
      handleGraphMove(0, -ev.deltaY)
    }
  }

  /** 鼠标右键菜单事件 */
  function onContextmenu(ev: MouseEvent) {
    ev.preventDefault()
    ev.stopPropagation()
  }

  /** 浏览器窗口改变事件 */
  const onResize = debounce(() => {
    if (containerRef.value) {
      const { width, height } = containerRef.value.getBoundingClientRect()
      containerRect.width = width
      containerRect.height = height
    }
  }, 300)

  /** graph居中 */
  const onGraphCenter = debounce(() => {
    setGraphPosition({
      x: (containerRect.width - graphRect.value.width) / 2,
      y: (containerRect.height - graphRect.value.height) / 2
    })
  }, 300)

  return {
    containerRect,
    onMousedown,
    onMousemove,
    onMouseup,
    onWheel,
    onContextmenu,
    onResize,
    onGraphCenter
  }
}
