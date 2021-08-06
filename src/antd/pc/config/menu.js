const menuTree = [
  {
    name: '通用',
    icon: 'pie-chart',
    key: 'general',
    children: [
      {
        name: '按钮',
        key: 'button'
      },
      {
        name: '图标',
        key: 'icon'
      }
    ]
  },
  {
    name: '布局',
    icon: 'desktop',
    key: 'layout',
    children: [
      {
        name: '删格',
        key: 'grid'
      },
      {
        name: '布局',
        key: 'layout'
      },
      {
        name: '间距',
        key: 'space'
      }
    ]
  },
  {
    name: '表单',
    icon: 'pie-chart',
    key: 'data-entry',
    children: [
      {
        name: '自动完成',
        key: 'autoComplete'
      },
      {
        name: '级联选择',
        key: 'cascader'
      },
      {
        name: '多选框',
        key: 'checkbox'
      }
    ]
  },
  {
    name: '数据展示',
    icon: 'pie-chart',
    key: 'data-display',
    children: [
      {
        name: '列表',
        key: 'table'
      }
    ]
  }
]

export default menuTree
