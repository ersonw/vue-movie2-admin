
import Layout from '@/layout'

const SystemRouter = {
  path: '/System',
  component: Layout,
  redirect: '/System/list',
  name: 'System',
  meta: {
    title: '系统配置'
  },
  children: [
    {
      path: 'listWithdraw',
      component: () => import('@/views/withdraw/list'),
      name: 'listWithdraw',
      meta: { title: '管理员' }
    },
    {
      path: 'ListCards',
      component: () => import('@/views/withdraw/ListCards'),
      name: 'ListCards',
      meta: { title: '系统日志' }
    }
  ]
}
export default SystemRouter
