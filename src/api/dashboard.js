import request from '@/utils/request'

export function getAll(data) {
  return request({
    url: '/dashboard/getAll',
    method: 'get',
    params: data
  })
}
export function info(data) {
  return request({
    url: '/dashboard/info',
    method: 'get',
    params: data
  })
}
