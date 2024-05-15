/**
 * 获取Dom节点的宽高
 * @param el Element
 * @returns 宽度和高度
 */
export function getSizeByElement<T extends HTMLElement>(el: T, width: string = 'auto') {
  const copyNode = el.cloneNode(true) as T
  copyNode.style.position = 'fixed'
  copyNode.style.width = width
  document.body.appendChild(copyNode)
  const elRect = copyNode.getBoundingClientRect()
  copyNode.remove()
  return elRect
}
