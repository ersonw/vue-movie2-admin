import Layout from '@/layout'

const AppRouter = {
  path: '/app',
  component: Layout,
  redirect: '/app/usersConfig',
  name: 'app',
  meta: {
    title: 'APP模块'
  },
  children: [
    {
      path: 'usersConfig',
      component: () => import('@/views/app/usersConfig'),
      name: 'usersConfig',
      meta: { title: '用户中心配置' }
    },
    {
      path: 'bootConfig',
      component: () => import('@/views/app/bootConfig'),
      name: 'bootConfig',
      meta: { title: '启动配置' }
    }
  ]
}
export default AppRouter
