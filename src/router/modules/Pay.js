
import Layout from '@/layout'

const PayRouter = {
  path: '/pay',
  component: Layout,
  redirect: '/pay/CommodityVip',
  name: 'pay',
  meta: {
    title: '支付中心'
  },
  children: [
    {
      path: 'onlinePay',
      component: () => import('@/views/pay/onlinePay'),
      name: 'onlinePay',
      meta: { title: '在线支付' }
    },
    {
      path: 'ConfigPay',
      component: () => import('@/views/pay/ConfigPay'),
      name: 'ConfigPay',
      meta: { title: '支付配置' }
    },
    {
      path: 'ShowPayOrder',
      component: () => import('@/views/pay/ShowPayOrder'),
      name: 'ShowPayOrder',
      meta: { title: '在线订单' }
    },
    {
      path: 'OnlinePayOrder',
      component: () => import('@/views/pay/OnlinePayOrder'),
      name: 'OnlinePayOrder',
      meta: { title: '支付订单' }
    }
  ]
}
export default PayRouter
