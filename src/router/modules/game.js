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
      path: 'gameWater',
      component: () => import('@/views/game/gameWater'),
      name: 'gameWater',
      meta: { title: '游戏流水' }
    },
    {
      path: 'gameUserWater/:id(\\d+)',
      component: () => import('@/views/game/gameUserWater'),
      name: 'gameUserWater',
      meta: { title: '用户游戏流水', noCache: true, activeMenu: 'gameWater' },
      hidden: true
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
    },
    {
      path: 'gameWithdrawConfig',
      component: () => import('@/views/game/gameWithdrawConfig'),
      name: 'gameWithdrawConfig',
      meta: { title: '提现配置' }
    },
    {
      path: 'gameWithdrawCard',
      component: () => import('@/views/game/gameWithdrawCard'),
      name: 'gameWithdrawCard',
      meta: { title: '卡号管理' }
    },
    {
      path: 'gameWithdrawOrder',
      component: () => import('@/views/game/gameWithdrawOrder'),
      name: 'gameWithdrawOrder',
      meta: { title: '提现订单' }
    }
  ]
}

export default GameRouter
