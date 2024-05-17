import { debounce } from 'lodash'
import { reactive, computed, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

export function useElementSize(elRef: Ref<HTMLDivElement | undefined>) {
  const size = reactive({ width: 0, height: 0 })

  const onResize = debounce(() => {
    console.log('onResize')
    if (elRef.value) {
      const { width, height } = elRef.value.getBoundingClientRect()
      size.width = width
      size.height = height
    }
  }, 300)

  onMounted(() => {
    onResize()
    window.addEventListener('resize', onResize)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })

  return { size: computed(() => size) }
}
