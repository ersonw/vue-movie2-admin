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
export function getActiveList(data, id) {
  return request({
    url: '/av/getActiveList/' + id,
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

export function getVideoSource(data) {
  return request({
    url: '/av/getVideoSource',
    method: 'get',
    params: data
  })
}
export function deleteVideoSource(data) {
  return request({
    url: '/av/deleteVideoSource',
    method: 'post',
    data
  })
}
export function addVideoSource(data) {
  return request({
    url: '/av/addVideoSource',
    method: 'post',
    data
  })
}
export function updateVideoSource(data) {
  return request({
    url: '/av/updateVideoSource',
    method: 'post',
    data
  })
}
export function getVideoSourceList(data, id) {
  return request({
    url: '/av/getVideoSourceList/' + id,
    method: 'get',
    params: data
  })
}
export function getVideoSourceActiveList(data, id) {
  return request({
    url: '/av/getVideoSourceActiveList/' + id,
    method: 'get',
    params: data
  })
}
export function deleteVideoSourceList(data) {
  return request({
    url: '/av/deleteVideoSourceList',
    method: 'post',
    data
  })
}
export function addVideoSourceList(data) {
  return request({
    url: '/av/addVideoSourceList',
    method: 'post',
    data
  })
}
export function getIndexPublicity(data) {
  return request({
    url: '/av/getIndexPublicity',
    method: 'get',
    params: data
  })
}
export function deleteIndexPublicity(data) {
  return request({
    url: '/av/deleteIndexPublicity',
    method: 'post',
    data
  })
}
export function addIndexPublicity(data) {
  return request({
    url: '/av/addIndexPublicity',
    method: 'post',
    data
  })
}
export function updateIndexPublicity(data) {
  return request({
    url: '/av/updateIndexPublicity',
    method: 'post',
    data
  })
}
export function getPlayPublicity(data) {
  return request({
    url: '/av/getPlayPublicity',
    method: 'get',
    params: data
  })
}
export function deletePlayPublicity(data) {
  return request({
    url: '/av/deletePlayPublicity',
    method: 'post',
    data
  })
}
export function addPlayPublicity(data) {
  return request({
    url: '/av/addPlayPublicity',
    method: 'post',
    data
  })
}
export function updatePlayPublicity(data) {
  return request({
    url: '/av/updatePlayPublicity',
    method: 'post',
    data
  })
}
export function getVideoConfig(data) {
  return request({
    url: '/av/getVideoConfig',
    method: 'get',
    params: data
  })
}
export function deleteVideoConfig(data) {
  return request({
    url: '/av/deleteVideoConfig',
    method: 'post',
    data
  })
}
export function addVideoConfig(data) {
  return request({
    url: '/av/addVideoConfig',
    method: 'post',
    data
  })
}
export function updateVideoConfig(data) {
  return request({
    url: '/av/updateVideoConfig',
    method: 'post',
    data
  })
}
