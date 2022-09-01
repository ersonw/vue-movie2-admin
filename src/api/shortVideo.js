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
