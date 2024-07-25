<template>
  <Tabs v-model="currentTab" @tabsClick="onTabsClick" :disabled="disabledList">
    <template #default>
      <TabPane
        paneKey="mindOutline"
        :labelText="t('mindOutline.title')"
        labelIcon="icon-taigang"
        labelPosition="left"
        :contentTitle="t('mindOutline.title')"
        contentPosition="left"
      >
        <MindOutline></MindOutline>
      </TabPane>
      <TabPane
        paneKey="revoke"
        labelIcon="icon-chexiao"
        :labelTipContent="t('shortcutKeys.revoke')"
      />
      <TabPane
        paneKey="recovery"
        labelIcon="icon-huifu"
        :labelTipContent="t('shortcutKeys.recovery')"
      />
      <TabPane
        paneKey="toCenter"
        labelIcon="icon-dingwei"
        :labelTipContent="t('shortcutKeys.backCenter')"
      />
      <TabPaneLine />
      <TabPane paneKey="scaleSelect" :labelTipContent="'画布比例'">
        <template #customTab>
          <MindScale></MindScale>
        </template>
      </TabPane>
      <TabPaneLine />
      <TabPane
        paneKey="mindStyle"
        labelIcon="icon-yangshi"
        :labelTipContent="t('mindStyle.title')"
        :contentTitle="t('mindStyle.title')"
      >
        <template #customTabPane>
          <MindStyle></MindStyle>
        </template>
      </TabPane>
      <TabPane
        paneKey="mindTheme"
        labelIcon="icon-jiegoufengluo"
        :labelTipContent="t('mindTheme.title')"
        :contentTitle="t('mindTheme.title')"
      >
        <MindTheme></MindTheme>
      </TabPane>
      <TabPaneLine />
      <TabPane
        paneKey="insertNode"
        labelIcon="icon-zharutongjijiedian"
        :labelTipContent="t('shortcutKeys.insertNode')"
      />
      <TabPane
        paneKey="insertChildNode"
        labelIcon="icon-zharuzijijiedian"
        :labelTipContent="t('shortcutKeys.insertChildNode')"
      />
      <TabPane
        paneKey="generalization"
        labelIcon="icon-gaiyao"
        :labelTipContent="t('shortcutKeys.generalization')"
      />
      <TabPane
        paneKey="associativeLine"
        labelIcon="icon-lianxiexian"
        :labelTipContent="t('shortcutKeys.associativeLine')"
      />
      <TabPane
        paneKey="nodeIcon"
        labelIcon="icon-biaoqing"
        :labelTipContent="t('shortcutKeys.nodeIcon')"
        :contentTitle="t('shortcutKeys.nodeIcon')"
      >
        <NodeIcon></NodeIcon>
      </TabPane>
      <TabPane
        paneKey="nodeImage"
        labelIcon="icon-zharutupian"
        :labelTipContent="t('shortcutKeys.nodeImage')"
      />
      <TabPane
        paneKey="nodeTag"
        labelIcon="icon-zharubiaoqian"
        :labelTipContent="t('shortcutKeys.nodeTag')"
        :contentTitle="t('shortcutKeys.nodeTag')"
      >
        <NodeTag></NodeTag>
      </TabPane>
      <TabPaneLine />
      <TabPane
        paneKey="miniMap"
        labelIcon="icon-shitudaohang"
        :labelTipContent="t('shortcutKeys.miniMap')"
      />
    </template>
    <template #content>
      <MindMap ref="mindMapRef" />
    </template>
  </Tabs>

  <NodeImage v-model="nodeImageVisible"></NodeImage>
</template>

<script lang="ts">
export default {
  name: 'DesktopEditor'
}
type TTabPaneType =
  | 'mindOutline'
  | 'revoke'
  | 'recovery'
  | 'toCenter'
  | 'scaleSelect'
  | 'mindStyle'
  | 'mindTheme'
  | 'insertNode'
  | 'insertChildNode'
  | 'generalization'
  | 'associativeLine'
  | 'nodeIcon'
  | 'nodeImage'
  | 'nodeTag'
  | 'miniMap'
</script>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useLocale } from 'element-plus'
import 'element-plus/es/components/select/style/css'
import { Tabs, TabPane, TabPaneLine } from './components/Tabs'
import { MindOutline, MindScale, MindStyle, MindTheme, NodeIcon, NodeTag } from './SideContent'
import NodeImage from './NodeImage/index.vue'
import MindMap from '@/mindMap/index.vue'

const currentTab = ref<TTabPaneType>()
const disabledList = reactive<TTabPaneType[]>(['revoke', 'recovery'])

const mindMapRef = ref<InstanceType<typeof MindMap>>()

const nodeImageVisible = ref<boolean>(false)

const { t } = useLocale()

function onTabsClick(tab?: TTabPaneType) {
  switch (tab) {
    case 'mindOutline':
      break
    case 'revoke':
      break
    case 'recovery':
      break
    case 'toCenter':
      mindMapRef.value?.onGraphCenter()
      break
    case 'nodeImage':
      nodeImageVisible.value = true
      break
    default:
      break
  }
}
</script>

<style scoped lang="scss"></style>
