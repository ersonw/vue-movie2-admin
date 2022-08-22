
import Layout from '@/layout'

const WithdrawRouter = {
  path: '/Withdraw',
  component: Layout,
  redirect: '/Withdraw/list',
  name: 'Withdraw',
  meta: {
    title: '提现中心'
  },
  children: [
    {
      path: 'listWithdraw',
      component: () => import('@/views/withdraw/list'),
      name: 'listWithdraw',
      meta: { title: '订单列表' }
    },
    {
      path: 'ListCards',
      component: () => import('@/views/withdraw/ListCards'),
      name: 'ListCards',
      meta: { title: '提现卡号' }
    }
  ]
}
export default WithdrawRouter
