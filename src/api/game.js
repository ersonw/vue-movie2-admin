import request from '@/utils/request'

export function getGameList(data) {
  return request({
    url: '/game/getGameList',
    method: 'get',
    params: data
  })
}
export function deleteGame(data) {
  return request({
    url: '/game/deleteGame',
    method: 'post',
    data
  })
}
export function updateGame(data) {
  return request({
    url: '/game/updateGame',
    method: 'post',
    data
  })
}
export function addGame(data) {
  return request({
    url: '/game/addGame',
    method: 'post',
    data
  })
}
export function getButtonList(data) {
  return request({
    url: '/game/getButtonList',
    method: 'get',
    params: data
  })
}
export function deleteButton(data) {
  return request({
    url: '/game/deleteButton',
    method: 'post',
    data
  })
}
export function updateButton(data) {
  return request({
    url: '/game/updateButton',
    method: 'post',
    data
  })
}
export function addButton(data) {
  return request({
    url: '/game/addButton',
    method: 'post',
    data
  })
}
export function getButtonConfigList(data) {
  return request({
    url: '/game/getButtonConfigList',
    method: 'get',
    params: data
  })
}
export function getButtonConfig(id) {
  return request({
    url: '/game/getButtonConfig/' + id,
    method: 'get'
  })
}
export function getGameConfig(data) {
  return request({
    url: '/game/getGameConfig',
    method: 'get',
    params: data
  })
}
export function updateGameConfig(data) {
  return request({
    url: '/game/updateGameConfig',
    method: 'post',
    data
  })
}
export function getGameOrderList(data) {
  return request({
    url: '/game/getGameOrderList',
    method: 'get',
    params: data
  })
}
export function deleteGameOrder(data) {
  return request({
    url: '/game/deleteGameOrder',
    method: 'post',
    data
  })
}
export function makeupGameOrder(data) {
  return request({
    url: '/game/makeupGameOrder',
    method: 'post',
    data
  })
}
export function getGameWithdrawConfig(data) {
  return request({
    url: '/game/getGameWithdrawConfig',
    method: 'get',
    params: data
  })
}
export function updateGameWithdrawConfig(data) {
  return request({
    url: '/game/updateGameWithdrawConfig',
    method: 'post',
    data
  })
}
export function getGameWithdrawOrder(data) {
  return request({
    url: '/game/getGameWithdrawOrder',
    method: 'get',
    params: data
  })
}
export function makeDownGameWithdrawOrder(data) {
  return request({
    url: '/game/makeDownGameWithdrawOrder',
    method: 'post',
    data
  })
}
export function makeupGameWithdrawOrder(data) {
  return request({
    url: '/game/makeupGameWithdrawOrder',
    method: 'post',
    data
  })
}
export function getGameWithdrawCard(data) {
  return request({
    url: '/game/getGameWithdrawCard',
    method: 'get',
    params: data
  })
}
export function deleteGameWithdrawCard(data) {
  return request({
    url: '/game/deleteGameWithdrawCard',
    method: 'post',
    data
  })
}
export function updateGameWithdrawCard(data) {
  return request({
    url: '/game/updateGameWithdrawCard',
    method: 'post',
    data
  })
}
export function getGameWaterList(data) {
  return request({
    url: '/game/getGameWaterList',
    method: 'get',
    params: data
  })
}
export function getGameWater(data) {
  return request({
    url: '/game/getGameWater',
    method: 'get',
    params: data
  })
}
export function updateGameWater(data) {
  return request({
    url: '/game/updateGameWater',
    method: 'get',
    params: data
  })
}
export function getGamePublicity(data) {
  return request({
    url: '/game/getGamePublicity',
    method: 'get',
    params: data
  })
}
export function updateGamePublicity(data) {
  return request({
    url: '/game/updateGamePublicity',
    method: 'post',
    data
  })
}
export function deleteGamePublicity(data) {
  return request({
    url: '/game/deleteGamePublicity',
    method: 'post',
    data
  })
}
export function addGamePublicity(data) {
  return request({
    url: '/game/addGamePublicity',
    method: 'post',
    data
  })
}
export function getGameScroll(data) {
  return request({
    url: '/game/getGameScroll',
    method: 'get',
    params: data
  })
}
export function updateGameScroll(data) {
  return request({
    url: '/game/updateGameScroll',
    method: 'post',
    data
  })
}
export function deleteGameScroll(data) {
  return request({
    url: '/game/deleteGameScroll',
    method: 'post',
    data
  })
}
export function addGameScroll(data) {
  return request({
    url: '/game/addGameScroll',
    method: 'post',
    data
  })
}
export function automaticGameScroll(data) {
  return request({
    url: '/game/automaticGameScroll',
    method: 'post',
    data
  })
}
