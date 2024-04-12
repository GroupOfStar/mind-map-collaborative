import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useMindMapStore = defineStore('note', () => {
  const visible = ref(false)
  const treeData = reactive<NodeData[]>([])

  function setupTreeData(data: NodeData[]) {
    treeData.splice(0, treeData.length, ...data)
  }

  function handleVisibleToggle() {
    visible.value = !visible.value
  }

  // 修改节点数据
  function changeTreeData(
    key: keyof CoreData,
    id: string | undefined,
    keyData: CoreData[keyof CoreData]
  ) {
    if (id) {
      updateTreeData(treeData, key, id, keyData)
    }
  }

  // 更新数据
  function updateTreeData(
    data: NodeData[],
    key: keyof CoreData,
    id: string,
    keyData: CoreData[keyof CoreData]
  ) {
    for (let index = 0; index < data.length; index++) {
      const item = data[index]
      if (item.id == id) {
        item.data[key] = keyData
        break
      } else {
        if (item.children) {
          updateTreeData(item.children, key, id, keyData)
        }
      }
    }
  }

  return {
    visible,
    treeData,
    setupTreeData,
    changeTreeData,
    handleVisibleToggle
  }
})
