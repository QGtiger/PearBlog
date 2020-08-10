const Layout = () => import('@/layouts/ORMLayout')

export default [
  {
    path: '/',
    name: 'orm-shouye',
    component: Layout,
    meta: {
      isAdmin: false,
      isLogin: true
    },
    children: [
      {
        path: '/',
        component: () => import('@/views/orm/shouye/shouye')
      },
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/orm/shouye/shouye')
      }
    ]
  }
]