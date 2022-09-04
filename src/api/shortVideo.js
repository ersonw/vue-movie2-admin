import request from '@/utils/request'

export function getVideoList(data) {
  return request({
    url: '/shortVideo/getVideoList',
    method: 'get',
    params: data
  })
}
export function deleteVideo(data) {
  return request({
    url: '/shortVideo/deleteVideo',
    method: 'post',
    data
  })
}
export function updateVideo(data) {
  return request({
    url: '/shortVideo/updateVideo',
    method: 'post',
    data
  })
}
export function getShortVideoUser(data, id) {
  return request({
    url: '/shortVideo/getShortVideoUser/' + id,
    method: 'get',
    params: data
  })
}
export function getUser(id) {
  return request({
    url: '/shortVideo/getUser/' + id,
    method: 'get'
  })
}
export function getAuditVideoList(data) {
  return request({
    url: '/shortVideo/getAuditVideoList',
    method: 'get',
    params: data
  })
}
export function getAuditVideo(data) {
  return request({
    url: '/shortVideo/getAuditVideo',
    method: 'get',
    params: data
  })
}
export function passAuditVideo(data) {
  return request({
    url: '/shortVideo/passAuditVideo',
    method: 'post',
    data
  })
}
export function denyAuditVideo(data) {
  return request({
    url: '/shortVideo/denyAuditVideo',
    method: 'post',
    data
  })
}
