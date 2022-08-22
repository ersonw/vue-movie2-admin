import request from '@/utils/request'
export function checkUser(data) {
  return request({
    url: '/RechargeCentre/checkUser',
    method: 'get',
    params: { data }
  })
}
export function getBalanceList(data) {
  return request({
    url: '/RechargeCentre/getBalanceList',
    method: 'get',
    params: { data }
  })
}
export function updateBalance(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/RechargeCentre/updateBalance',
    method: 'post',
    data
  })
}
export function addBalance(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/RechargeCentre/addBalance',
    method: 'post',
    data
  })
}
export function deleteBalance(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/RechargeCentre/deleteBalance',
    method: 'post',
    data
  })
}

export function getDiamondList(data) {
  return request({
    url: '/RechargeCentre/getDiamondList',
    method: 'get',
    params: { data }
  })
}
export function updateDiamond(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/RechargeCentre/updateDiamond',
    method: 'post',
    data
  })
}
export function addDiamond(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/RechargeCentre/addDiamond',
    method: 'post',
    data
  })
}
export function deleteDiamond(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/RechargeCentre/deleteDiamond',
    method: 'post',
    data
  })
}

export function getGoldList(data) {
  return request({
    url: '/RechargeCentre/getGoldList',
    method: 'get',
    params: { data }
  })
}
export function updateGold(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/RechargeCentre/updateGold',
    method: 'post',
    data
  })
}
export function addGold(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/RechargeCentre/addGold',
    method: 'post',
    data
  })
}
export function deleteGold(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/RechargeCentre/deleteGold',
    method: 'post',
    data
  })
}
