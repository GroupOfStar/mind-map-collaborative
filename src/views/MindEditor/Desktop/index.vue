<template>
  <Tabs v-model="currentTab" @tabsClick="onTabsClick" :disabled="disabledList">
    <template #default>
      <TabPane
        paneKey="outline"
        :labelText="t('outline.title')"
        labelIcon="icon-taigang"
        labelPosition="left"
        :contentTitle="t('outline.title')"
        contentPosition="left"
      >
        {{ t('outline.title') }}
        <el-table mb-1 :data="[]" />
        <el-pagination :total="10" />
      </TabPane>
      <TabPane
        paneKey="revoke"
        labelIcon="icon-chexiao"
        :labelTipContent="t('shortcutKeys.revoke')"
      >
      </TabPane>
      <TabPane
        paneKey="recovery"
        labelIcon="icon-huifu"
        :labelTipContent="t('shortcutKeys.recovery')"
      >
      </TabPane>
      <TabPane
        paneKey="toCenter"
        labelIcon="icon-dingwei"
        :labelTipContent="t('shortcutKeys.backCenter')"
      >
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
type TTabPaneType = 'outline' | 'revoke' | 'recovery' | 'toCenter'
</script>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useLocale } from 'element-plus'
import { Tabs, TabPane, TabPaneLine } from './components/Tabs'
import MindMap from '@/mindMap/index.vue'

const currentTab = ref<TTabPaneType | undefined>('outline')
const disabledList = reactive<TTabPaneType[]>(['revoke', 'recovery'])
const { t } = useLocale()

function onTabsClick(tab?: TTabPaneType) {
  switch (tab) {
    case 'outline':
      break
    case 'revoke':
      break
    case 'recovery':
      break
    case 'toCenter':
      console.log('toCenter')
      break
    default:
      break
  }
}
</script>

<style scoped lang="scss"></style>
