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
