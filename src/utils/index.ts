import { config } from '@/service/config'

// 获取postmessage TargetOrigin
export const getTargetOrigin = (): string => {
  return '*' || location.origin
}

/**
 * parse/stringify 转换
 * @param {*} data
 * @param {string} to
 */
export function parseStringify(data: any, to: any, type = 'object') {
  if (!data) {
    const content: any = {
      object: {},
      array: []
    }
    return content[type]
  }

  let result = data
  switch (to) {
    case 'parse':
      if (typeof data == 'string') {
        result = JSON.parse(data)
      }
      break
    case 'stringify':
      if (data instanceof Object) {
        result = JSON.stringify(data)
      }
      break
  }

  return result
}

// 极简的深拷贝
export const simpleDeepClone = (data: any) => {
  try {
    return JSON.parse(JSON.stringify(data))
  } catch (_error) {
    return null
  }
}

// 给链接增加参数得判断
export function httpPrefix(url: string | URL, additionalParameters: any) {
  const parsedUrl = new URL(url)
  const existingParameters = Object.fromEntries(parsedUrl.searchParams.entries())
  const mergedParameters = { ...existingParameters, ...additionalParameters }
  parsedUrl.search = ''
  Object.keys(mergedParameters).forEach((key) => {
    parsedUrl.searchParams.set(key, mergedParameters[key])
  })

  return parsedUrl.toString()
}

const filterBaseData = (list: any, clear?: any) => {
  const data: any = {}
  for (const i in list) {
    if (i != 'id' && i != 'pid' && i != 'children' && i != 'getId' && i != 'root') {
      // 平级数据转树形时，将概要字符串转为对象
      if (i === 'generalization' && list[i] && typeof list[i] === 'string') {
        list[i] = JSON.parse(list[i])
      }
      // 如果节点是激活状态就改为false
      if (i === 'isActive' && clear) {
        list[i] = false
      }
      data[i] = list[i]
    }
  }
  return data
}

/**
 * 平级转思维导图树形结构
 * @param list 数据源
 * */
export const convertToTree = (list: any) => {
  const temp: any = {}
  let tree: any = {}

  list.forEach((item: any) => {
    if (!item.id || !item.children) {
      return
    }

    // 配置json
    if (item.id.indexOf(config.confModel) > -1) {
      tree = {
        id: item.id,
        ...item
      }
      tree.theme.config = parseStringify(tree.theme.config, 'parse')
    }
    // 节点json
    else {
      const data = filterBaseData(item, true)
      if (JSON.stringify(data) !== '{}' && item.pid) {
        temp[item.id] = {
          id: item.id,
          pid: item.pid,
          children: item.children || [],
          data
        }
      }
    }
  })

  const walk = (conf: any) => {
    const children = conf.children
    if (children?.length > 0) {
      for (let index = 0; index < children.length; index++) {
        const id = children[index]
        // 通过id查到节点数据
        const node = temp[id]
        if (node) {
          // 节点数据存在，将id替换成节点数据
          children.splice(index, 1, node)
          if (node.children.length > 0) {
            // 递归获取children的子id的节点数据
            walk(children[index])
          }
        } else {
          // 垃圾数据剔除
          // 节点数据不存在，将id（当前项）删除
          children.splice(index, 1)
          index--
        }
      }
    }
  }
  walk(tree)

  // 属性名称保持一致
  tree.root = tree.children[0]
  delete tree.children

  return tree
}

/**
 * 从所有节点中过滤出需要显示的节点
 * @param confNode
 * @param allNodes
 */
export function filterActiveNodes<T extends { id: string; children: string[] }>(
  allNodes: any,
  confNode: any
) {
  const queue: any[] = []
  const result: T[] = []
  queue.push(confNode)
  const way = (node: any, childId: any) => {
    if (!node.id) {
      node.id = childId
    }
  }
  while (queue.length > 0) {
    const node = queue.shift()
    if (node && node.children) {
      const children = node.children
      for (let i = 0; i < children.length; i++) {
        const childId = children[i]
        const node = allNodes[childId]
        if (node) {
          way(node, childId)
          queue.push(node)
          result.push(node)
        } else {
          children.splice(i, 1)
          i--
        }
      }
    }
  }
  return result
}

/**
 * 从所有节点中过滤出需要显示的节点
 * @param confNode
 * @param allNodes
 */
export function filterEffectiveNodes<T extends { id: string; children: string[] }>(
  docData: { [key: string]: T },
  rootNodeId: string
): T[] {
  const currentNode = Object.assign({}, docData[rootNodeId])
  return currentNode.children.reduce<T[]>(
    (preV, current) => {
      return preV.concat(filterEffectiveNodes(docData, current))
    },
    [currentNode]
  )
}

export function extractConfAndNodes(doc: any): [any, Record<string, any>] {
  let conf = null
  const nodes: Record<string, any> = {}
  for (const id in doc) {
    if (id.startsWith('conf')) {
      console.log('id :>> ', id)
      conf = doc[id]
      console.log('conf :>> ', conf)
      delete doc[id]
    } else if (id.startsWith('mind')) {
      nodes[id] = doc[id]
    }
  }
  return [conf, nodes]
}
