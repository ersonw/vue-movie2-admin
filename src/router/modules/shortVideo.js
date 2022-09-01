
import Layout from '@/layout'

const ShortVideoRouter = {
  path: '/av',
  component: Layout,
  redirect: '/av/list',
  name: 'av',
  meta: {
    title: '短视频模块'
  },
  children: [
    {
      path: 'shortVideoList',
      component: () => import('@/views/shortVideo/list'),
      name: 'shortVideoList',
      meta: { title: '全部视频' }
    }
  ]
}
export default ShortVideoRouter
