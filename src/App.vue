<template>
  <el-config-provider :locale="zhCn" :size="'default'" :z-index="3000">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<style scoped lang="scss"></style>
