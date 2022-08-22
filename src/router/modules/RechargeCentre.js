
import Layout from '@/layout'

const RechargeCentreRouter = {
  path: '/RechargeCentre',
  component: Layout,
  redirect: '/RechargeCentre/list',
  name: 'RechargeCentre',
  meta: {
    title: '流水中心'
  },
  children: [
    {
      path: 'BalanceTransaction',
      component: () => import('@/views/RechargeCentre/BalanceTransaction'),
      name: 'BalanceTransaction',
      meta: { title: '余额流水' }
    },
    {
      path: 'DiamondTransaction',
      component: () => import('@/views/RechargeCentre/DiamondTransaction'),
      name: 'DiamondTransaction',
      meta: { title: '钻石流水' }
    },
    {
      path: 'GoldTransaction',
      component: () => import('@/views/RechargeCentre/GoldTransaction'),
      name: 'GoldTransaction',
      meta: { title: '金币流水' }
    }
  ]
}
export default RechargeCentreRouter
