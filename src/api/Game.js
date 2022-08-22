import request from '@/utils/request'

export function configList(data) {
  return request({
    url: '/Game/configList',
    method: 'get',
    params: { data }
  })
}
export function getList(data) {
  return request({
    url: '/Game/getList',
    method: 'get',
    params: { data }
  })
}
export function update(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/Game/update',
    method: 'post',
    data
  })
}
export function del(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/Game/del',
    method: 'post',
    data
  })
}

