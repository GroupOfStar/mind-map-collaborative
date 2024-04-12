import { createRenderer } from 'vue'

export function createMindMapRenderer() {
  return createRenderer<Element, Element>({
    createElement(type, isSVG, isCustomizedBuiltIn, vnodeProps) {
      console.log('type :>> ', type)
      console.log('isSVG :>> ', isSVG)
      console.log('isCustomizedBuiltIn :>> ', isCustomizedBuiltIn)
      console.log('vnodeProps :>> ', vnodeProps)
      if (type === 'svg-canvas-graph') {
        const canvas = document.createElement('canvas')
        return canvas
      }
      // 对其他标签（如文本节点、自定义组件等）的处理，如果适用的话
      return document.createElement('div')
    },
    patchProp(el, key, _prevValue, nextValue) {
      console.log('el.tagName :>> ', el.tagName)
      console.log('patchProp key :>> ', key)
      if (el.tagName === 'canvas') {
        const canvas = el as HTMLCanvasElement
        switch (key) {
          case 'width':
            canvas.width = nextValue
            break
          case 'height':
            canvas.height = nextValue
            break
          case 'style': {
            // 处理样式变更，可能包括颜色、透明度等影响 Canvas 绘制的属性
            const style = nextValue || {}
            Object.assign(canvas.style, style)
            break
          }
          // 其他与 Canvas 绘制直接相关的属性，如 `id`、`className` 等，可以根据需要添加
          // 特别处理与绘制操作相关的属性
          case 'drawData': {
            const ctx = canvas.getContext('2d')!
            // 清除画布
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            // 假设 `drawData` 是一个包含绘制指令的对象
            // 在此处编写具体的 Canvas 绘制逻辑，根据 `nextValue` 更新画面
            // ...
            break
          }
          // ... 其他自定义属性的处理
        }
      } else {
        // 对非 Canvas 元素的属性更新逻辑，如果适用的话
      }
    },
    insert: function (el, parent, anchor): void {
      console.log('el :>> ', el)
      console.log('parent :>> ', parent)
      parent.insertBefore(el, anchor as any)
    },
    remove(_el) {
      throw new Error('Function not implemented.')
    },
    createText: function (_text) {
      throw new Error('Function not implemented.')
    },
    createComment: function (_text) {
      throw new Error('Function not implemented.')
    },
    setText: function (_node, _text) {
      throw new Error('Function not implemented.')
    },
    setElementText: function (_node, _text) {
      throw new Error('Function not implemented.')
    },
    parentNode: function (_node) {
      throw new Error('Function not implemented.')
    },
    nextSibling: function (_node) {
      throw new Error('Function not implemented.')
    }
  })
}
