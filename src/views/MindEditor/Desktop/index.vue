<template>
  <Tabs v-model="currentTab" @update:value="onTabsChange" :disabled="disabledList">
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
        contentTitle="撤销"
      >
        {{ t('shortcutKeys.revoke') }}
      </TabPane>
      <TabPane
        paneKey="redo"
        labelIcon="icon-huifu"
        :labelTipContent="t('shortcutKeys.redo')"
        :contentTitle="t('shortcutKeys.redo')"
      >
        {{ t('shortcutKeys.redo') }}
      </TabPane>
      <TabPane
        paneKey="toCenter"
        labelIcon="icon-dingwei"
        :labelTipContent="t('shortcutKeys.backCenter')"
        :contentTitle="t('shortcutKeys.backCenter')"
      >
        {{ t('shortcutKeys.backCenter') }}
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
import { useLocale } from 'element-plus'
import { Tabs, TabPane, TabPaneLine } from './components/Tabs'
import MindMap from '@/mindMap/index.vue'

const currentTab = ref<string | undefined>('outline')
const disabledList = reactive<string[]>(['revoke', 'redo'])
const { t } = useLocale()

function onTabsChange(tab: string | undefined) {
  console.log('tab :>> ', tab)
}
</script>

<style scoped lang="scss"></style>
