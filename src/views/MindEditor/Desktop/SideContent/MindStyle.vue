<template>
  <el-tabs>
    <el-tab-pane label="节点">节点</el-tab-pane>
    <el-tab-pane label="画布">画布</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
export default {
  name: 'MindStyle'
}
</script>
<script setup lang="ts">
import { ElTabs, ElTabPane } from 'element-plus'
import 'element-plus/es/components/tabs/style/css'
import 'element-plus/es/components/tab-pane/style/css'
</script>

<style scoped lang="scss">
:deep(.el-tabs__nav-wrap:after) {
  background-color: unset;
}
</style>
