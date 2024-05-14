import { ref, reactive, onMounted, onUnmounted } from 'vue'

export function useFullScreenSize() {
  const containerRef = ref<HTMLDivElement>()
  const graphSize = reactive({ width: 0, height: 0 })

  function onResize() {
    if (containerRef.value) {
      const { width, height } = containerRef.value.getBoundingClientRect()
      graphSize.width = width
      graphSize.height = height
    }
  }

  onMounted(() => {
    onResize()
    window.addEventListener('resize', onResize)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })

  return { containerRef, graphSize }
}
