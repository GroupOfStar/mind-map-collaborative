/**
 * 获取Dom节点的宽高
 * @param el Element
 * @returns 宽度和高度
 */
export function getSizeByElement<T extends HTMLElement>(el: T) {
  const copyNode = el.cloneNode(true) as T
  copyNode.style.position = 'fixed'
  document.body.appendChild(copyNode)
  const { width, height } = copyNode.getBoundingClientRect()
  copyNode.remove()
  return { width, height }
}
