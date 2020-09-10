const Layout = () => import('@/layouts/ORMLayout')

export default [
  {
    path: '/utils',
    name: 'orm-utils',
    component: Layout,
    redirect: '/utils/crop',
    meta: {
      isAdmin: false,
      isLogin: true
    },
    children: [
      {
        path: 'crop',
        component: () => import('@/views/orm/cropPage/cropPage'),
      }
    ]
  }
]