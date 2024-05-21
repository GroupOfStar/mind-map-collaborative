import { ref, computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { IBarScrollOption } from './interface'
import type { IScroll } from './../components/ScrollBar/interface.d'

export function useBarScroll(option: ComputedRef<IBarScrollOption>): IScroll {
  const isMousedown = ref(false)

  const scale = computed(() => {
    const { graphSize, containerSize } = option.value
    if (graphSize === 0 || containerSize === 0) {
      return 0
    } else {
      return graphSize / (containerSize + graphSize)
    }
  })

  /** 滚动条偏移量 */
  const offset = computed(() => {
    const { graphOffset, graphSize } = option.value
    return (graphOffset + graphSize / 2) * (1 - scale.value)
  })

  /** 滚动条大小 */
  const size = computed(() => option.value.containerSize * scale.value)

  /** 鼠标按下事件 */
  function onMousedown(ev: MouseEvent) {
    // 0表示左键, 1表示中键, 2表示右键
    switch (ev.button) {
      case 0:
        ev.stopPropagation()
        isMousedown.value = true
        break
      case 1:
      case 2:
        break
    }
  }

  /** 鼠标移动事件 */
  function onMousemove(ev: MouseEvent) {
    if (isMousedown.value) {
      ev.stopPropagation()
      const { type, containerSize, graphSize, setGraphPosition } = option.value
      const movement = type === 'horizontal' ? ev.movementX : ev.movementY
      const newOffset = offset.value + movement
      // 边界点
      const end = containerSize - size.value
      if (newOffset > 0 && newOffset < end) {
        setGraphPosition({
          [type === 'horizontal' ? 'x' : 'y']: newOffset / (1 - scale.value) - graphSize / 2
        })
      }
    }
  }

  /** 鼠标松开事件, 清除状态 */
  function onMouseup(ev: MouseEvent) {
    if (isMousedown.value) {
      ev.stopPropagation()
      isMousedown.value = false
    }
  }

  return { offset, size, onMousedown, onMousemove, onMouseup }
}
