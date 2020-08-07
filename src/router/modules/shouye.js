const Layout = () => import('@/layouts/mainLayout')

export default [
  {
    path: '/',
    name: 'shouye',
    component: Layout,
    meta: {
      isAdmin: false
    },
    children: [
      {
        path: '/',
        name: 'shouye-index',
        component: () => import('@/views/Home')
      },
      {
        path: '/index',
        name: 'shouye-index',
        component: () => import('@/views/Home')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginForm')
  }
]