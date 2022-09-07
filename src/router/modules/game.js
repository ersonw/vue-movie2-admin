import Layout from '@/layout'

const GameRouter = {
  path: '/game',
  component: Layout,
  redirect: '/game/list',
  name: 'game',
  meta: {
    title: '游戏模块'
  },
  children: [
    {
      path: 'gameList',
      component: () => import('@/views/game/gameList'),
      name: 'gameList',
      meta: { title: '全部游戏' }
    },
    {
      path: 'gameConfig',
      component: () => import('@/views/game/gameConfig'),
      name: 'gameConfig',
      meta: { title: '游戏配置' }
    },
    {
      path: 'gameButton',
      component: () => import('@/views/game/gameButton'),
      name: 'gameButton',
      meta: { title: '充值按钮' }
    },
    {
      path: 'gameOrder',
      component: () => import('@/views/game/gameOrder'),
      name: 'gameOrder',
      meta: { title: '充值订单' }
    }
  ]
}

export default GameRouter
