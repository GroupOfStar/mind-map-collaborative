import { reactive, computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { ISetGraphPosition } from './interface'
import { isNumber } from 'lodash'

export function useGraphScroll(graphSize: ComputedRef<{ width: number; height: number }>) {
  /** graph位置 */
  const position = reactive({ x: 0, y: 0 })

  /** graph图形位置信息 */
  const graphRect = computed<IRect>(() => {
    return {
      x: position.x,
      y: position.y,
      width: graphSize.value.width,
      height: graphSize.value.height
    }
  })

  /** 修改graph图形位置 */
  const setGraphPosition: ISetGraphPosition = (_position) => {
    if (isNumber(_position.x)) {
      position.x = _position.x
    }
    if (isNumber(_position.y)) {
      position.y = _position.y
    }
  }

  return { graphRect, setGraphPosition }
}
