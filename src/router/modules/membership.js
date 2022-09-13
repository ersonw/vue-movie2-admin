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
    },
    {
      path: 'membershipBenefit',
      component: () => import('@/views/membership/membershipBenefit'),
      name: 'membershipBenefit',
      meta: { title: '会员权益' }
    },
    {
      path: 'membershipGrade',
      component: () => import('@/views/membership/membershipGrade'),
      name: 'membershipGrade',
      meta: { title: '等级图标' }
    },
    {
      path: 'membershipButton',
      component: () => import('@/views/membership/membershipButton'),
      name: 'membershipButton',
      meta: { title: '开通按钮' }
    },
    {
      path: 'membershipOrder',
      component: () => import('@/views/membership/membershipOrder'),
      name: 'membershipOrder',
      meta: { title: '开通订单' }
    },
    {
      path: 'membershipLevel',
      component: () => import('@/views/membership/membershipLevel'),
      name: 'membershipLevel',
      meta: { title: '等级经验配置' }
    },
    {
      path: 'membershipConfig',
      component: () => import('@/views/membership/membershipConfig'),
      name: 'membershipConfig',
      meta: { title: '会员配置' }
    }
  ]
}
export default MembershipRouter
