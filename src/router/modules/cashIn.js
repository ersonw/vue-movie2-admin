import Layout from '@/layout'

const CashInRouter = {
  path: '/cashIn',
  component: Layout,
  redirect: '/cashIn/rechargeChannel',
  name: 'cashIn',
  meta: {
    title: '充值模块'
  },
  children: [
    {
      path: 'rechargeChannel',
      component: () => import('@/views/cashIn/rechargeChannel'),
      name: 'rechargeChannel',
      meta: { title: '充值渠道' }
    },
    {
      path: 'rechargeOption',
      component: () => import('@/views/cashIn/rechargeOption'),
      name: 'rechargeOption',
      meta: { title: '充值方式' }
    }
    // {
    //   path: 'membershipListExperience/:id(\\d+)',
    //   component: () => import('@/views/users/membershipListExperience'),
    //   name: 'membershipListExperience',
    //   meta: { title: '会员经验记录', noCache: true, activeMenu: 'membershipList' },
    //   hidden: true
    // }
  ]
}
export default CashInRouter
