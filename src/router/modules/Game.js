
import Layout from '@/layout'

const GameRouter = {
  path: '/Game',
  component: Layout,
  redirect: '/Game/listGame',
  name: 'Game',
  meta: {
    title: '游戏中心'
  },
  children: [
    {
      path: 'listGame',
      component: () => import('@/views/game/list'),
      name: 'listGame',
      meta: { title: '游戏列表' }
    },
    {
      path: 'configGame',
      component: () => import('@/views/game/config'),
      name: 'configGame',
      meta: { title: '游戏配置' }
    }
  ]
}
export default GameRouter
