import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/withdraw/getList',
    method: 'get',
    params: { data }
  })
}
export function handleShenHe(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/withdraw/handleShenHe',
    method: 'post',
    data
  })
}
export function handleBack(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/withdraw/handleBack',
    method: 'post',
    data
  })
}
export function update(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/withdraw/update',
    method: 'post',
    data
  })
}
export function del(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/withdraw/del',
    method: 'post',
    data
  })
}
export function getCardList(data) {
  return request({
    url: '/withdraw/getCardList',
    method: 'get',
    params: { data }
  })
}
export function updateCard(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/withdraw/updateCard',
    method: 'post',
    data
  })
}
export function delCard(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/withdraw/delCard',
    method: 'post',
    data
  })
}
