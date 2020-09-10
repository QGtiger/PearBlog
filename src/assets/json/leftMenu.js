export default [
  {
    title: '首页',
    icon: 'el-icon-s-grid',
    path: '/orm',
    subs: []
  },
  // {
  //   title: '客户管理',
  //   icon: 'el-icon-user',
  //   path: '',
  //   subs: [
  //     {
  //       title: '用户管理',
  //       icon: 'el-icon-document',
  //       path: '',
  //       subs:[]
  //     },
  //     {
  //       title: '权限管理',
  //       icon: 'el-icon-s-check',
  //       path: '',
  //       subs: []
  //     }
  //   ]
  // },
  {
    title: '工具组件',
    icon: 'el-icon-setting',
    path: '/orm/utils',
    subs: [
      {
        title: 'croper 剪切',
        icon: 'el-icon-picture-outline',
        path: '/orm/utils/crop',
        subs: []
      }
    ]
  }
]