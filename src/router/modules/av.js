
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
      path: 'videoClass',
      component: () => import('@/views/av/videoClass'),
      name: 'videoClass',
      meta: { title: '分类管理' }
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
      path: 'diamondOrder',
      component: () => import('@/views/av/diamondOrder'),
      name: 'diamondOrder',
      meta: { title: '钻石充值订单' }
    },
    {
      path: 'diamondConfig',
      component: () => import('@/views/av/diamondConfig'),
      name: 'diamondConfig',
      meta: { title: '钻石配置' }
    },
    {
      path: 'diamondButton',
      component: () => import('@/views/av/diamondButton'),
      name: 'diamondButton',
      meta: { title: '钻石按钮' }
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
    },
    {
      path: 'videoSource',
      component: () => import('@/views/av/videoSource'),
      name: 'videoSource',
      meta: { title: '来源标签' }
    },
    {
      path: 'videoSource/:id(\\d+)',
      component: () => import('@/views/av/videoSourceList'),
      name: 'videoSourceList',
      meta: { title: '来源标签列表', noCache: true, activeMenu: 'videoSource' },
      hidden: true
    },
    {
      path: 'videoConfig',
      component: () => import('@/views/av/videoConfig'),
      name: 'videoConfig',
      meta: { title: '长视频配置' }
    },
    {
      path: 'indexPublicity',
      component: () => import('@/views/av/indexPublicity'),
      name: 'indexPublicity',
      meta: { title: '首页广告' }
    },
    {
      path: 'playPublicity',
      component: () => import('@/views/av/playPublicity'),
      name: 'playPublicity',
      meta: { title: '播放页广告' }
    }
  ]
}
export default AVRouter
