import request from '@/utils/request'

export function getSmsRecordsList(data) {
  return request({
    url: '/users/getSmsRecordsList',
    method: 'get',
    params: { data }
  })
}
export function getList(data) {
  return request({
    url: '/users/list',
    method: 'get',
    params: { data }
  })
}
export function getSuperior(data) {
  return request({
    url: '/users/superior',
    method: 'get',
    params: { data }
  })
}
export function getShare(data) {
  return request({
    url: '/users/share',
    method: 'get',
    params: { data }
  })
}
export function update(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/users/update',
    method: 'post',
    data
  })
}
export function del(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/users/delete',
    method: 'post',
    data
  })
}
