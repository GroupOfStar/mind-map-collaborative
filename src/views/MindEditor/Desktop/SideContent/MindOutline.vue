<template>
  <div class="content">
    <el-tree
      :data="treeData"
      node-key="id"
      :icon="IconComponent"
      :expand-on-click-node="false"
      :auto-expand-parent="false"
      :default-expanded-keys="expandedKeys"
      @node-expand="onNodeExpand"
      @node-collapse="onNodeCollapse"
    >
      <template #default="{ data, node }">
        <div class="custom-node">
          <div
            :class="['node-edit', { 'is-root': data.data.isRoot, 'is-second': data.data.isSecond }]"
            :id="data.id"
            :key="data.id"
            :data-level="node.level"
            contenteditable="true"
            v-text="data.data.text"
            v-adaptive
            @blur="onBlur($event, data.id)"
            @paste="onPaste($event)"
            @keydown="onKeyDown"
            @click="onClick($event, data.id)"
          ></div>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MindOutline'
}
</script>
<script setup lang="ts">
import { ref, defineComponent, h } from 'vue'
import type { Directive } from 'vue'
import { ElTree } from 'element-plus'
import type { TreeNode, TreeNodeData } from 'element-plus/es/components/tree-v2/src/types'

const IconComponent = defineComponent({
  name: 'IconComponent',
  setup() {
    return () => h('i', { class: 'icon-mind icon-xiasanjiao-tai' })
  }
})

defineProps({
  currentTab: { type: String }
})

/** 展开节点keys */
const treeData = ref<any[]>([])
/** 展开节点keys */
const expandedKeys = ref<string[]>([])

// const textWidthMap = reactive(new Map<string, number>())

// watch(
//   () => props.currentTab,
//   (val) => {
//     handleDataChange()
//   }
// )

function handleAdaptive(el: HTMLDivElement) {
  //   const { width } = getSizeByElement(el)
  //   const elId = el.getAttribute('id')
  //   const level = Number(el.dataset.level)
  //   if (elId) {
  //     textWidthMap.set(elId, Math.min(width, 500) + 8 + 24 + (level - 1) * 18)
  //   }
}

/** 定义局部自定义指令 */
const VAdaptive: Directive<HTMLDivElement> = {
  mounted: handleAdaptive,
  updated: handleAdaptive
}

/** 节点被展开时 */
function onNodeExpand(data: TreeNodeData, node: TreeNode) {
  //   if (!$mind.map) {
  //     return
  //   }
  //   const curNode = $mind.map.fromIdGetNode(data.id)
  //   if (curNode.isRoot) {
  //     return
  //   }
  //   $mind.map.hideText()
  //   $mind.map.execCommand('SET_NODE_EXPAND', curNode, true)
}

/** 节点被收起时 */
function onNodeCollapse(data: TreeNodeData, node: TreeNode) {
  //   if (!$mind.map) {
  //     return
  //   }
  //   const curNode = $mind.map.fromIdGetNode(data.id)
  //   if (curNode.isRoot) {
  //     return
  //   }
  //   $mind.map.execCommand('SET_NODE_EXPAND', curNode, false)
}

/** 按键事件 */
function onKeyDown(ev: any) {
  //   if (!$mind.map) {
  //     return
  //   }
  //   if (ev.key === 'Enter' || ev.key === 'Tab') {
  //     $mind.map.keyCommand.recovery()
  //   } else {
  //     $mind.map.closeOpenText(true)
  //     $mind.map.keyCommand.pause()
  //   }
}

/** 获取焦点事件 */
function onBlur(ev: FocusEvent, key: string) {
  //   if (!$mind.map) {
  //     return
  //   }
  //   const node = $mind.map.fromIdGetNode(key)
  //   $mind.map.closeOpenText(false)
  //   $mind.map.keyCommand.recovery()
  //   const htmlText = (ev.target as HTMLDivElement)?.innerText
  //   if (node && htmlText !== node.nodeData.data.text) {
  //     node.setText(htmlText)
  //   }
}

/** 粘贴事件 */
function onPaste(ev: ClipboardEvent) {
  //   if (!$mind.map) {
  //     return
  //   }
  //   // 仅仅只需要在粘贴的时候赋值，否则dom节点经过销毁后会currentNode不存在的，会导致一系列问题
  //   $mind.map.renderer.textEdit.currentNode = ev.target as HTMLDivElement
  //   $mind.map.renderer.textEdit.onPaste(ev)
}

/** 点击大纲激活节点 */
function onClick(ev: MouseEvent, id: string) {
  //   if (!$mind.map) {
  //     return
  //   }
  //   $mind.map.renderer.textEdit.currentNode = undefined
  //   const node = $mind.map.fromIdGetNode(id)
  //   if (node.nodeData.data.isActive) {
  //     return
  //   }
  //   $mind.map.closeOpenText(true)
  //   node.mindMap.renderer.moveNodeToCenter(node)
  //   node.active()
}

// onMounted(() => {
//   $bus.on('data_change', handleDataChange)
// })
// onUnmounted(() => {
//   $bus.off('data_change', handleDataChange)
// })
</script>

<style scoped lang="scss">
// .content {
//   padding-bottom: 20px;
//   height: 100%;
//   overflow: overlay;

//   :deep(.el-tree-node__content) {
//     border-radius: 8px;
//     height: auto;
//     &:hover {
//       background: rgba(0, 0, 0, 0.04);
//     }
//     .el-icon.el-tree-node__expand-icon {
//       transform: rotate(-90deg);
//       color: #999;
//       &.expanded {
//         transform: rotate(0deg);
//       }

//       &.is-leaf {
//         color: inherit;
//         visibility: initial;
//         .icon-mind:before {
//           content: '';
//           display: block;
//           width: 8px;
//           height: 8px;
//           border-radius: 50%;
//           background-color: #999;
//         }
//       }
//     }
//   }

//   .custom-node {
//     padding: 9px 4px;
//     line-height: 22px;
//     width: 100%;

//     .node-edit {
//       outline: none;
//       color: var(--cs-text-color);
//       font-size: 16px;
//       white-space: pre-wrap;
//       word-wrap: break-word;
//       word-break: break-all;
//       &.is-root {
//         font-size: 18px;
//         font-family: getCssVar('font-family', 'medium');
//       }
//       &.is-second {
//         font-family: getCssVar('font-family', 'medium');
//       }
//     }
//   }
// }
</style>
