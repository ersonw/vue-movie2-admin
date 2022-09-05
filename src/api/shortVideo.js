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
export function getAuditCommentList(data) {
  return request({
    url: '/shortVideo/getAuditCommentList',
    method: 'get',
    params: data
  })
}
export function deleteAuditComments(data) {
  return request({
    url: '/shortVideo/deleteAuditComments',
    method: 'post',
    data
  })
}
export function denyAuditComments(data) {
  return request({
    url: '/shortVideo/denyAuditComments',
    method: 'post',
    data
  })
}
export function passAuditComments(data) {
  return request({
    url: '/shortVideo/passAuditComments',
    method: 'post',
    data
  })
}
export function getAuditCommentListChild(data, id) {
  return request({
    url: '/shortVideo/getAuditCommentListChild/' + id,
    method: 'get',
    params: data
  })
}
export function getAuditComment(data) {
  return request({
    url: '/shortVideo/getAuditComment',
    method: 'get',
    params: data
  })
}
export function deleteAuditComment(data) {
  return request({
    url: '/shortVideo/deleteAuditComment',
    method: 'post',
    data
  })
}
export function denyAuditComment(data) {
  return request({
    url: '/shortVideo/denyAuditComment',
    method: 'post',
    data
  })
}
export function passAuditComment(data) {
  return request({
    url: '/shortVideo/passAuditComment',
    method: 'post',
    data
  })
}

