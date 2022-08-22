
import Layout from '@/layout'

const usersRouter = {
  path: '/users',
  component: Layout,
  redirect: '/users/list',
  name: 'Users',
  meta: {
    title: '用户中心'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/users/list'),
      name: 'list',
      meta: { title: '用户列表' }
    },
    {
      path: 'smsRecords',
      component: () => import('@/views/users/smsRecords'),
      name: 'smsRecords',
      meta: { title: '短信记录' }
    }
  ]
}
export default usersRouter
