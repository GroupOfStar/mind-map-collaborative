import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import type { ComputedRef } from 'vue'
import { useElementSize } from './useElementSize'

interface ISize {
  width: number
  height: number
}

export function useScroll(graphSize: ComputedRef<ISize>) {
  const containerRef = ref<HTMLDivElement>()

  const { size: containerSize } = useElementSize(containerRef)

  const isRightMousedown = ref(false)
  const graphPosition = reactive({ x: 0, y: 0 })

  const scaleX = computed(() => {
    const graphW = graphSize.value.width
    const containerW = containerSize.value.width
    if (graphW === 0 || containerW === 0) {
      return 0
    } else {
      return graphW / (containerW + graphW)
    }
  })

  const scaleY = computed(() => {
    const graphH = graphSize.value.height
    const containerH = containerSize.value.height
    if (graphH === 0 || containerH === 0) {
      return 0
    } else {
      return graphH / (containerH + graphH)
    }
  })

  /** graph图形位置信息 */
  const graphRect = computed<IRect>(() => {
    return {
      x: graphPosition.x,
      y: graphPosition.y,
      width: graphSize.value.width,
      height: graphSize.value.height
    }
  })

  /** 滚动条图形位置 */
  const scrollRect = computed<IRect>(() => {
    const scrollWidth = containerSize.value.width * scaleX.value
    const scrollHeight = containerSize.value.height * scaleY.value
    return {
      x: (graphPosition.x + graphSize.value.width / 2) * (1 - scaleX.value),
      y: (graphPosition.y + graphSize.value.height / 2) * (1 - scaleY.value),
      width: scrollWidth,
      height: scrollHeight
    }
  })

  // 鼠标按下事件
  function onMousedown(ev: MouseEvent) {
    ev.stopPropagation()
    // 0表示左键, 1表示中键, 2表示右键
    switch (ev.button) {
      case 0:
      case 1:
        break
      case 2:
        isRightMousedown.value = true
        containerRef.value!.style.cursor = 'grab'
        break
    }
  }

  // 鼠标移动事件
  function onMousemove(ev: MouseEvent) {
    ev.stopPropagation()
    if (isRightMousedown.value) {
      containerRef.value!.style.cursor = 'grabbing'
      const { movementX, movementY } = ev
      // 边界点
      const startX = -graphSize.value.width / 2
      const startY = -graphSize.value.height / 2
      const endX = containerSize.value.width - graphSize.value.width / 2
      const endY = containerSize.value.height - graphSize.value.height / 2
      if (graphPosition.x + movementX > startX && graphPosition.x + movementX < endX) {
        graphPosition.x += movementX
      }
      if (graphPosition.y + movementY > startY && graphPosition.y + movementY < endY) {
        graphPosition.y += movementY
      }
    }
  }

  // 鼠标松开事件, 清除状态
  function onMouseup(ev: MouseEvent) {
    ev.stopPropagation()
    containerRef.value!.style.cursor = 'default'
    isRightMousedown.value = false
  }

  // 鼠标右键菜单事件
  function onContextmenu(ev: MouseEvent) {
    ev.preventDefault()
    ev.stopPropagation()
  }

  /** graph居中 */
  function onGraphCenter() {
    graphPosition.x = (containerSize.value.width - graphSize.value.width) / 2
    graphPosition.y = (containerSize.value.height - graphSize.value.height) / 2
  }

  onMounted(() => {
    if (containerRef.value) {
      containerRef.value.addEventListener('mousedown', onMousedown)
      containerRef.value.addEventListener('mousemove', onMousemove)
      containerRef.value.addEventListener('mouseup', onMouseup)
      containerRef.value.addEventListener('contextmenu', onContextmenu)
    }
  })
  onUnmounted(() => {
    if (containerRef.value) {
      containerRef.value.removeEventListener('mousedown', onMousedown)
      containerRef.value.removeEventListener('mousemove', onMousemove)
      containerRef.value.removeEventListener('mouseup', onMouseup)
      containerRef.value.removeEventListener('contextmenu', onContextmenu)
    }
  })

  return {
    containerRef,
    containerSize,
    graphRect,
    scrollRect,
    onGraphCenter
  }
}
