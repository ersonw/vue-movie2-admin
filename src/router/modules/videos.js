
import Layout from '@/layout'

const videosRouter = {
  path: '/videos',
  component: Layout,
  redirect: '/videos/list',
  name: 'videos',
  meta: {
    title: '视频中心'
  },
  children: [
    {
      path: 'videosList',
      component: () => import('@/views/videos/videosList'),
      name: 'videosList',
      meta: { title: '视频列表' }
    },
    {
      path: 'classList',
      component: () => import('@/views/videos/classList'),
      name: 'classList',
      meta: { title: '分类列表' }
    },
    {
      path: 'BoutiqueList',
      component: () => import('@/views/videos/BoutiqueList'),
      name: 'BoutiqueList',
      meta: { title: '精品管理' }
    },
    {
      path: 'ActorList',
      component: () => import('@/views/videos/ActorList'),
      name: 'ActorList',
      meta: { title: '演员管理' }
    },
    {
      path: 'wolfFriendList',
      component: () => import('@/views/videos/wolfFriendList'),
      name: 'wolfFriendList',
      meta: { title: '狼友推荐' }
    },
    {
      path: 'VideoOrders',
      component: () => import('@/views/videos/VideoOrders'),
      name: 'VideoOrders',
      meta: { title: '购买订单' }
    },
    {
      path: 'EditorRecommends',
      component: () => import('@/views/videos/EditorRecommends'),
      name: 'EditorRecommends',
      meta: { title: '编辑推荐' }
    }
  ]
}
export default videosRouter
