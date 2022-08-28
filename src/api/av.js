import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/av/getAVList',
    method: 'get',
    params: data
  })
}
export function deleteAv(data) {
  return request({
    url: '/av/delete',
    method: 'post',
    data
  })
}
export function update(data) {
  return request({
    url: '/av/update',
    method: 'post',
    data
  })
}
export function addPrice(data) {
  return request({
    url: '/av/addPrice',
    method: 'post',
    data
  })
}
export function deleteTrash(data) {
  return request({
    url: '/av/deleteTrash',
    method: 'post',
    data
  })
}
export function updateTrash(data) {
  return request({
    url: '/av/updateTrash',
    method: 'post',
    data
  })
}
export function getTrashList(data) {
  return request({
    url: '/av/getTrashList',
    method: 'get',
    params: data
  })
}
export function getPriceList(data) {
  return request({
    url: '/av/getPriceList',
    method: 'get',
    params: data
  })
}
export function updatePrice(data) {
  return request({
    url: '/av/updatePrice',
    method: 'post',
    data
  })
}
export function deletePrice(data) {
  return request({
    url: '/av/deletePrice',
    method: 'post',
    data
  })
}
export function getOrderList(data) {
  return request({
    url: '/av/getOrderList',
    method: 'get',
    params: data
  })
}
export function deleteOrder(data) {
  return request({
    url: '/av/deleteOrder',
    method: 'post',
    data
  })
}
export function getCommentList(data) {
  return request({
    url: '/av/getCommentList',
    method: 'get',
    params: data
  })
}
export function deleteComment(data) {
  return request({
    url: '/av/deleteComment',
    method: 'post',
    data
  })
}
export function passComment(data) {
  return request({
    url: '/av/passComment',
    method: 'post',
    data
  })
}
export function getConcentration(data) {
  return request({
    url: '/av/getConcentration',
    method: 'get',
    params: data
  })
}
export function deleteConcentration(data) {
  return request({
    url: '/av/deleteConcentration',
    method: 'post',
    data
  })
}
export function addConcentration(data) {
  return request({
    url: '/av/addConcentration',
    method: 'post',
    data
  })
}
export function updateConcentration(data) {
  return request({
    url: '/av/updateConcentration',
    method: 'post',
    data
  })
}
export function getConcentrationList(data, id) {
  return request({
    url: '/av/getConcentrationList/' + id,
    method: 'get',
    params: data
  })
}
export function deleteConcentrationList(data) {
  return request({
    url: '/av/deleteConcentrationList',
    method: 'post',
    data
  })
}
export function addConcentrationList(data) {
  return request({
    url: '/av/addConcentrationList',
    method: 'post',
    data
  })
}
