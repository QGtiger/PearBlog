export default [
  {
    title: '首页',
    icon: 'el-icon-s-grid',
    path: '/orm',
    subs: []
  },
  {
    title: '客户管理',
    icon: 'el-icon-user',
    subs: [
      {
        title: '用户管理',
        icon: 'el-icon-document',
        subs:[]
      },
      {
        title: '权限管理',
        icon: 'el-icon-s-check',
        subs: []
      }
    ]
  }
]