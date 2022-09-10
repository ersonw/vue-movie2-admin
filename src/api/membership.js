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
export function expiredMembership(data) {
  return request({
    url: '/membership/expiredMembership',
    method: 'post',
    data
  })
}
export function getMembershipListOrder(data) {
  return request({
    url: '/membership/getMembershipListOrder',
    method: 'get',
    params: data
  })
}
export function deleteMembershipListOrder(data) {
  return request({
    url: '/membership/deleteMembershipListOrder',
    method: 'post',
    data
  })
}
export function getMembershipListExperience(data) {
  return request({
    url: '/membership/getMembershipListExperience',
    method: 'get',
    params: data
  })
}
export function deleteMembershipListExperience(data) {
  return request({
    url: '/membership/deleteMembershipListExperience',
    method: 'post',
    data
  })
}
