interface INoteEvent {
  /**
   * 节点聚焦事件
   * @param nodeData 聚焦节点
   * @param evt 点击事件
   */
  note_node_focus(nodeData: NodeData, evt: FocusEvent): void
  /**
   * 当前激活的节点是否要标记为选中状态
   * @param selected 是否要标记为选中状态
   */
  note_node_selected(selected?: boolean): void
  /**
   * 设置激活的节点
   * @param nodeData 激活的节点
   */
  set_active_node(nodeData?: NodeData): void
  /**
   * 节点展开收起
   * @param nodeData 要展开收起的节点
   */
  note_expand_toggle(nodeData: NodeData): void
  /**
   * 修改节点的icon数据
   * @param nodeData 选中节点
   * @param iconVal 新的icon数据
   */
  note_icon_update(nodeData: NodeData, iconVal: string[]): void
  /**
   * 修改节点的link数据
   * @param nodeData 选中节点
   * @param linkVal 新的icon数据
   */
  note_link_update(nodeData: NodeData, linkVal?: string): void
  /**
   * 圆点点击事件
   * @param nodeData 选中节点
   * @param evt 点击事件
   */
  note_point_click(nodeData?: NodeData, evt?: Event): void
  /**
   * 打开悬浮框
   * @param key 悬浮框key
   * @param nodeData 选中节点
   * @param evt 点击事件
   */
  note_popover_open(key: string, nodeData?: NodeData, evt?: HTMLElement): void
}
