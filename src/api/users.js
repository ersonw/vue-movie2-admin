import request from '@/utils/request'

export function getMembershipList(data) {
  return request({
    url: '/membership/getMembershipList',
    method: 'get',
    params: data
  })
}
export function deleteMembership(data) {
  return request({
    url: '/membership/deleteMembership',
    method: 'post',
    data
  })
}
