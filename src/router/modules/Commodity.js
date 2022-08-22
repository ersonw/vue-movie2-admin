
import Layout from '@/layout'

const CommodityRouter = {
  path: '/commodity',
  component: Layout,
  redirect: '/commodity/CommodityVip',
  name: 'Commodity',
  meta: {
    title: '商品中心'
  },
  children: [
    {
      path: 'CommodityVip',
      component: () => import('@/views/commodity/CommodityVip'),
      name: 'CommodityVip',
      meta: { title: '会员商品' }
    },
    {
      path: 'CommodityDiamond',
      component: () => import('@/views/commodity/CommodityDiamond'),
      name: 'CommodityDiamond',
      meta: { title: '钻石商品' }
    },
    {
      path: 'CommodityGold',
      component: () => import('@/views/commodity/CommodityGold'),
      name: 'CommodityGold',
      meta: { title: '金币商品' }
    }
  ]
}
export default CommodityRouter
