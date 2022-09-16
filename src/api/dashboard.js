import request from '@/utils/request'

export function getAll(data) {
  return request({
    url: '/dashboard/getAll',
    method: 'get',
    params: data
  })
}
