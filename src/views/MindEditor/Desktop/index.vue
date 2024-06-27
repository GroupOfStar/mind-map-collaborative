<template>
  <Tabs v-model="currentTab" @update:value="onTabsChange" :disabled="disabledList">
    <template #default>
      <TabPane
        paneKey="outline"
        labelText="大纲"
        labelIcon="icon-taigang"
        labelPosition="left"
        contentTitle="大纲"
        contentPosition="left"
      >
        大纲浮窗
      </TabPane>
      <!-- 撤销 -->
      <TabPane paneKey="revoke" labelIcon="icon-chexiao" labelTipContent="撤销" contentTitle="撤销">
        撤销浮窗
      </TabPane>
      <!-- 重做 -->
      <TabPane paneKey="redo" labelIcon="icon-huifu" labelTipContent="重做" contentTitle="重做">
        重做浮窗
      </TabPane>
      <!-- 回到中心 -->
      <TabPane
        paneKey="toCenter"
        labelIcon="icon-dingwei"
        labelTipContent="回到中心"
        contentTitle="回到中心"
      >
        回到中心
      </TabPane>
      <TabPaneLine />
    </template>
    <template #content><MindMap /></template>
  </Tabs>
</template>

<script lang="ts">
export default {
  name: 'DesktopEditor'
}
</script>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Tabs, TabPane, TabPaneLine } from './components/Tabs'
import MindMap from '@/mindMap/index.vue'

const currentTab = ref<string | undefined>('outline')
const disabledList = reactive<string[]>(['revoke', 'redo'])

function onTabsChange(tab: string | undefined) {
  console.log('tab :>> ', tab)
}
</script>

<style scoped lang="scss"></style>
