
import Layout from '@/layout'

const APPConfigRouter = {
  path: '/APPConfig',
  component: Layout,
  redirect: '/APPConfig/list',
  name: 'APPConfig',
  meta: {
    title: '配置中心'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/APPConfig/APPConfigList'),
      name: 'APPConfigList',
      meta: { title: '配置管理' }
    },
    {
      path: 'version',
      component: () => import('@/views/APPConfig/APPConfigVersion'),
      name: 'APPConfigVersion',
      meta: { title: '版本管理' }
    },
    {
      path: 'Carousel',
      component: () => import('@/views/APPConfig/Carousel'),
      name: 'Carousel',
      meta: { title: '首页轮播' }
    }
  ]
}
export default APPConfigRouter
