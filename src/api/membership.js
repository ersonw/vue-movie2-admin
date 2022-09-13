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
export function getBenefitList(data) {
  return request({
    url: '/membership/getBenefitList',
    method: 'get',
    params: data
  })
}
export function deleteBenefit(data) {
  return request({
    url: '/membership/deleteBenefit',
    method: 'post',
    data
  })
}
export function updateBenefit(data) {
  return request({
    url: '/membership/updateBenefit',
    method: 'post',
    data
  })
}
export function addBenefit(data) {
  return request({
    url: '/membership/addBenefit',
    method: 'post',
    data
  })
}

export function getGradeList(data) {
  return request({
    url: '/membership/getGradeList',
    method: 'get',
    params: data
  })
}
export function deleteGrade(data) {
  return request({
    url: '/membership/deleteGrade',
    method: 'post',
    data
  })
}
export function updateGrade(data) {
  return request({
    url: '/membership/updateGrade',
    method: 'post',
    data
  })
}
export function addGrade(data) {
  return request({
    url: '/membership/addGrade',
    method: 'post',
    data
  })
}
export function getButtonList(data) {
  return request({
    url: '/membership/getButtonList',
    method: 'get',
    params: data
  })
}
export function deleteButton(data) {
  return request({
    url: '/membership/deleteButton',
    method: 'post',
    data
  })
}
export function updateButton(data) {
  return request({
    url: '/membership/updateButton',
    method: 'post',
    data
  })
}
export function addButton(data) {
  return request({
    url: '/membership/addButton',
    method: 'post',
    data
  })
}
export function getOrderList(data) {
  return request({
    url: '/membership/getOrderList',
    method: 'get',
    params: data
  })
}
export function deleteOrder(data) {
  return request({
    url: '/membership/deleteOrder',
    method: 'post',
    data
  })
}
export function makeupOrder(data) {
  return request({
    url: '/membership/makeupOrder',
    method: 'post',
    data
  })
}
export function getLevelList(data) {
  return request({
    url: '/membership/getLevelList',
    method: 'get',
    params: data
  })
}
export function deleteLevel(data) {
  return request({
    url: '/membership/deleteLevel',
    method: 'post',
    data
  })
}
export function updateLevel(data) {
  return request({
    url: '/membership/updateLevel',
    method: 'post',
    data
  })
}
export function addLevel(data) {
  return request({
    url: '/membership/addLevel',
    method: 'post',
    data
  })
}
export function getConfig(data) {
  return request({
    url: '/membership/getConfig',
    method: 'get',
    params: data
  })
}
export function updateConfig(data) {
  return request({
    url: '/membership/updateConfig',
    method: 'post',
    data
  })
}
