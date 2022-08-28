
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
      path: 'videoConcentration',
      component: () => import('@/views/av/videoConcentration'),
      name: 'videoConcentration',
      meta: { title: '首页推荐' }
    },
    {
      path: 'videoConcentration/:id(\\d+)',
      component: () => import('@/views/av/videoConcentrationList'),
      name: 'videoConcentrationList',
      meta: { title: '推荐列表', noCache: true, activeMenu: 'videoConcentration' },
      hidden: true
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
    },
    {
      path: 'comment',
      component: () => import('@/views/av/comment'),
      name: 'comment',
      meta: { title: '视频回复' }
    }
  ]
}
export default AVRouter
