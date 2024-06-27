<template>
  <Teleport :to="sectionTeleportEl">
    <el-divider direction="vertical" />
  </Teleport>
</template>

<script lang="ts">
export default {
  name: 'TabPaneLine'
}
</script>
<script setup lang="ts">
import { computed } from 'vue'
import type { ITabPaneLineProps } from './interface.d'
import { useInjection } from './useInjection'

const props = withDefaults(defineProps<ITabPaneLineProps>(), { labelPosition: 'center' })

const { sectionTeleportEl } = useInjection(computed(() => props.labelPosition))
</script>

<style scoped lang="scss">
.line {
  width: 1px;
  height: 16px;
  background: var(--el-border-color-light);
  margin: 0 4px;
}
</style>
