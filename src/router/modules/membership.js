import Layout from '@/layout'

const MembershipRouter = {
  path: '/membership',
  component: Layout,
  redirect: '/membership/membershipList',
  name: 'membership',
  meta: {
    title: '会员模块'
  },
  children: [
    {
      path: 'membershipList',
      component: () => import('@/views/membership/membershipList'),
      name: 'membershipList',
      meta: { title: '会员列表' }
    },
    {
      path: 'membershipListExperience/:id(\\d+)',
      component: () => import('@/views/membership/membershipListExperience'),
      name: 'membershipListExperience',
      meta: { title: '会员经验记录', noCache: true, activeMenu: 'membershipList' },
      hidden: true
    },
    {
      path: 'membershipListOrder/:id(\\d+)',
      component: () => import('@/views/membership/membershipListOrder'),
      name: 'membershipListOrder',
      meta: { title: '会员开通记录', noCache: true, activeMenu: 'membershipList' },
      hidden: true
    }
  ]
}
export default MembershipRouter
