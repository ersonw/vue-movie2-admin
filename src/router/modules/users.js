import Layout from '@/layout'

const UsersRouter = {
  path: '/users',
  component: Layout,
  redirect: '/users/usersList',
  name: 'users',
  meta: {
    title: '用户模块'
  },
  children: [
    {
      path: 'usersList',
      component: () => import('@/views/users/usersList'),
      name: 'usersList',
      meta: { title: '用户列表' }
    },
    {
      path: 'usersConfig',
      component: () => import('@/views/users/usersConfig'),
      name: 'usersConfig',
      meta: { title: '用户配置' }
    },
    {
      path: 'usersConsume',
      component: () => import('@/views/users/usersConsume'),
      name: 'usersConsume',
      meta: { title: '用户消费' }
    },
    {
      path: 'usersConsumeUser/:id(\\d+)',
      component: () => import('@/views/users/usersConsumeUser'),
      name: 'usersConsumeUser',
      meta: { title: '用户消费记录', noCache: true, activeMenu: 'usersConsume' },
      hidden: true
    },
    {
      path: 'usersConsumeAgent/:id(\\d+)',
      component: () => import('@/views/users/usersConsumeAgent'),
      name: 'usersConsumeAgent',
      meta: { title: '用户消费代理分成', noCache: true, activeMenu: 'usersConsume' },
      hidden: true
    },
    {
      path: 'usersSpreadRecord',
      component: () => import('@/views/users/usersSpreadRecord'),
      name: 'usersSpreadRecord',
      meta: { title: '推广记录' }
    },
    {
      path: 'usersSpreadRecordUser/:id(\\d+)',
      component: () => import('@/views/users/usersSpreadRecordUser'),
      name: 'usersSpreadRecordUser',
      meta: { title: '推广下线记录', noCache: true, activeMenu: 'usersSpreadRecord' },
      hidden: true
    },
    {
      path: 'usersSpreadConfig',
      component: () => import('@/views/users/usersSpreadConfig'),
      name: 'usersSpreadConfig',
      meta: { title: '推广返利配置' }
    }
  ]
}
export default UsersRouter
