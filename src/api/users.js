import request from '@/utils/request'

export function getUserList(data) {
  return request({
    url: '/users/getUserList',
    method: 'get',
    params: data
  })
}
export function deleteUser(data) {
  return request({
    url: '/users/deleteUser',
    method: 'post',
    data
  })
}
export function freezeUser(data) {
  return request({
    url: '/users/freezeUser',
    method: 'post',
    data
  })
}
export function unfreezeUser(data) {
  return request({
    url: '/users/unfreezeUser',
    method: 'post',
    data
  })
}
