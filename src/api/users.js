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
export function getConfig(data) {
  return request({
    url: '/users/getConfig',
    method: 'get',
    params: data
  })
}
export function updateConfig(data) {
  return request({
    url: '/users/updateConfig',
    method: 'post',
    data
  })
}
export function getUsersConsumeList(data) {
  return request({
    url: '/users/getUsersConsumeList',
    method: 'get',
    params: data
  })
}
export function getUsersConsumeListUser(data) {
  return request({
    url: '/users/getUsersConsumeListUser',
    method: 'get',
    params: data
  })
}
export function makeupConsumeListUser(data) {
  return request({
    url: '/users/makeupConsumeListUser',
    method: 'post',
    data
  })
}
export function makeDownConsumeListUser(data) {
  return request({
    url: '/users/makeDownConsumeListUser',
    method: 'post',
    data
  })
}
export function getUsersConsumeListAgent(data) {
  return request({
    url: '/users/getUsersConsumeListAgent',
    method: 'get',
    params: data
  })
}
export function makeupConsumeListAgent(data) {
  return request({
    url: '/users/makeupConsumeListAgent',
    method: 'post',
    data
  })
}
export function makeDownConsumeListAgent(data) {
  return request({
    url: '/users/makeDownConsumeListAgent',
    method: 'post',
    data
  })
}
export function getUsersSpreadRecordList(data) {
  return request({
    url: '/users/getUsersSpreadRecordList',
    method: 'get',
    params: data
  })
}

export function getUsersSpreadRecordUserList(data) {
  return request({
    url: '/users/getUsersSpreadRecordUserList',
    method: 'get',
    params: data
  })
}
export function deleteUsersSpreadRecordUserList(data) {
  return request({
    url: '/users/deleteUsersSpreadRecordUserList',
    method: 'post',
    data
  })
}
export function getSpreadConfig(data) {
  return request({
    url: '/users/getSpreadConfig',
    method: 'get',
    params: data
  })
}
export function updateSpreadConfig(data) {
  return request({
    url: '/users/updateSpreadConfig',
    method: 'post',
    data
  })
}
