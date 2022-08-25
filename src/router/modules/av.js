
import Layout from '@/layout'

const AVRouter = {
  path: '/av',
  component: Layout,
  redirect: '/av/list',
  name: 'av',
  meta: {
    title: '长视频模块'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/av/list'),
      name: 'list',
      meta: { title: '全部视频' }
    },
    {
      path: 'videoPrice',
      component: () => import('@/views/av/videoPrice'),
      name: 'videoPrice',
      meta: { title: '收费视频' }
    },
    {
      path: 'videoOrder',
      component: () => import('@/views/av/videoOrder'),
      name: 'videoOrder',
      meta: { title: '购买订单' }
    },
    {
      path: 'trash',
      component: () => import('@/views/av/trash'),
      name: 'trash',
      meta: { title: '视频回收站' }
    }
  ]
}
export default AVRouter
