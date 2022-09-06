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
      path: 'gameButton',
      component: () => import('@/views/game/gameButton'),
      name: 'gameButton',
      meta: { title: '充值按钮' }
    }
  ]
}

export default GameRouter
