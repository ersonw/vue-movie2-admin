import request from '@/utils/request'

export function getChannelList(data) {
  return request({
    url: '/recharge/getChannelList',
    method: 'get',
    params: data
  })
}
export function deleteChannel(data) {
  return request({
    url: '/recharge/deleteChannel',
    method: 'post',
    data
  })
}
export function updateChannel(data) {
  return request({
    url: '/recharge/updateChannel',
    method: 'post',
    data
  })
}
export function addChannel(data) {
  return request({
    url: '/recharge/addChannel',
    method: 'post',
    data
  })
}
export function getOptionList(data) {
  return request({
    url: '/recharge/getOptionList',
    method: 'get',
    params: data
  })
}
