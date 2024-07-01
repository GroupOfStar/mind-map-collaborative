<template>
  <el-config-provider :locale="locale" :size="'default'" :z-index="3000">
    <DesktopEditor />
  </el-config-provider>
</template>

<script lang="ts">
export default {
  name: 'MindEditor'
}
</script>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import DesktopEditor from './Desktop/index.vue'
import { iframe, IFRAME_MESSAGE_NAME } from '@/iframe'
import { collaborate } from '@/service'
import type { ICollaborativeOpt } from '@/service'
import { useMindMapStore } from '@/store'
import { ElConfigProvider } from 'element-plus'
import type { Language } from 'element-plus/es/locale'
import { zhCN, enUS } from '@/lang'

const locale = ref<Language>(zhCN)
const mindMapStore = useMindMapStore()

iframe.init().then((res) => {
  console.log('res.initialize :>> ', res.initialize)
  const { docId, collaConfig, traceId, realName, lang } = res.initialize
  const option: ICollaborativeOpt = {
    docId,
    scene: collaConfig?.scene,
    authenticate: {
      traceId,
      realName,
      ...collaConfig?.authentication
    },
    WSDocumentPlugin: {
      ...collaConfig?.collabOptions,
      awarenessDebounceMs: 100 //awareness防抖间隔默认为100
    }
  }
  collaborate.init(option)
  collaborate.registryAwareNess()
  onSettingLang({ lang })
  collaborate.factoryAddListener(function (nodes, config) {
    mindMapStore.setupData(nodes, config)

    // 显示iframe的导航栏
    iframe.provider.request('onEditorDataChange', {
      data: [...nodes, config],
      fileId: config.id.split('#')[1]
    })
  })
})

// 设置国际化
function onSettingLang({ lang }: { lang: 'zh-CN' | 'en-US' }) {
  // i18n.global.locale.value = lang
  locale.value = lang === 'zh-CN' ? zhCN : enUS
}

iframe.registryAction('settingLang', onSettingLang)

function onIframeMessage(message: any) {
  console.log('onIframeMessage message :>> ', message.detail)
}

onMounted(() => {
  // 监听外层消息发送事件
  window.addEventListener(IFRAME_MESSAGE_NAME, onIframeMessage)
})

onUnmounted(() => {
  window.removeEventListener(IFRAME_MESSAGE_NAME, onIframeMessage)
})
</script>

<style scoped lang="scss"></style>
