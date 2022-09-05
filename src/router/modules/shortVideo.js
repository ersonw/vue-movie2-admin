
import Layout from '@/layout'

const ShortVideoRouter = {
  path: '/shortVideo',
  component: Layout,
  redirect: '/shortVideo/list',
  name: 'shortVideo',
  meta: {
    title: '短视频模块'
  },
  children: [
    {
      path: 'shortVideoList',
      component: () => import('@/views/short/list'),
      name: 'shortVideoList',
      meta: { title: '全部视频' }
    },
    {
      path: 'shortVideoUser/:id(\\d+)',
      component: () => import('@/views/short/shortVideoUser'),
      name: 'shortVideoUser',
      meta: { title: '用户视频', noCache: true, activeMenu: 'shortVideoUser' },
      hidden: true
    },
    {
      path: 'auditVideoList',
      component: () => import('@/views/short/auditVideoList'),
      name: 'auditVideoList',
      meta: { title: '审核视频' }
    },
    {
      path: 'auditCommentList',
      component: () => import('@/views/short/auditCommentList'),
      name: 'auditCommentList',
      meta: { title: '审核评论' }
    },
    {
      path: 'auditAuditCommentListChild/:id(\\d+)',
      component: () => import('@/views/short/auditAuditCommentListChild'),
      name: 'auditAuditCommentListChild',
      meta: { title: '回复列表', noCache: true, activeMenu: 'auditCommentList' },
      hidden: true
    },
    {
      path: 'auditComment',
      component: () => import('@/views/short/auditComment'),
      name: 'auditComment',
      meta: { title: '审核评论举报' }
    }
  ]
}
export default ShortVideoRouter
