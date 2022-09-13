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
    }
    // ,
    // {
    //   path: 'membershipListExperience/:id(\\d+)',
    //   component: () => import('@/views/users/membershipListExperience'),
    //   name: 'membershipListExperience',
    //   meta: { title: '会员经验记录', noCache: true, activeMenu: 'membershipList' },
    //   hidden: true
    // }
  ]
}
export default UsersRouter
