import request from '@/utils/request'

export function getTypeList(data) {
  return request({
    url: '/pay/getTypeList',
    method: 'get',
    params: { data }
  })
}
export function getOnlinePayList(data) {
  return request({
    url: '/pay/getOnlinePayList',
    method: 'get',
    params: { data }
  })
}
export function addOnlinePay(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/pay/addOnlinePay',
    method: 'post',
    data
  })
}
export function updateOnlinePay(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/pay/updateOnlinePay',
    method: 'post',
    data
  })
}
export function deleteOnlinePay(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/pay/deleteOnlinePay',
    method: 'post',
    data
  })
}
export function getConfigPayList(data) {
  return request({
    url: '/pay/getConfigPayList',
    method: 'get',
    params: { data }
  })
}
export function addConfigPay(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/pay/addConfigPay',
    method: 'post',
    data
  })
}
export function updateConfigPay(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/pay/updateConfigPay',
    method: 'post',
    data
  })
}
export function deleteConfigPay(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/pay/deleteConfigPay',
    method: 'post',
    data
  })
}
export function getShowPayOrderList(data) {
  return request({
    url: '/pay/getShowPayOrderList',
    method: 'get',
    params: { data }
  })
}
export function ShowPayOrderSuccess(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/pay/ShowPayOrderSuccess',
    method: 'post',
    data
  })
}
export function ShowPayOrderFail(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/pay/ShowPayOrderFail',
    method: 'post',
    data
  })
}

export function getOnlinePayOrderList(data) {
  return request({
    url: '/pay/getOnlinePayOrderList',
    method: 'get',
    params: { data }
  })
}
export function OnlinePayOrderSuccess(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/pay/OnlinePayOrderSuccess',
    method: 'post',
    data
  })
}
export function OnlinePayOrderFail(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/pay/OnlinePayOrderFail',
    method: 'post',
    data
  })
}
export function getPidList(data) {
  return request({
    url: '/pay/getPidList',
    method: 'get',
    params: { data }
  })
}
