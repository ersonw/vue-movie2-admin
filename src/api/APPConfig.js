import request from '@/utils/request'

export function getAPPConfigVersionList(data) {
  return request({
    url: '/APPConfig/getAPPConfigVersionList',
    method: 'get',
    params: { data }
  })
}
export function updateAPPConfigVersionList(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/APPConfig/updateAPPConfigVersionList',
    method: 'post',
    data
  })
}
export function addAPPConfigVersionList(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/APPConfig/addAPPConfigVersionList',
    method: 'post',
    data
  })
}
export function deleteAPPConfigVersionList(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/APPConfig/deleteAPPConfigVersionList',
    method: 'post',
    data
  })
}
export function getAPPConfigList(data) {
  return request({
    url: '/APPConfig/getAPPConfigList',
    method: 'get',
    params: { data }
  })
}
export function updateConfig(data) {
  return request({
    url: '/APPConfig/updateConfig',
    method: 'get',
    params: { data }
  })
}
export function updateAPPConfigList(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/APPConfig/updateAPPConfigList',
    method: 'post',
    data
  })
}
export function getCarouselList(data) {
  return request({
    url: '/APPConfig/getCarouselList',
    method: 'get',
    params: { data }
  })
}
export function updateCarousel(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/APPConfig/updateCarousel',
    method: 'post',
    data
  })
}
export function addCarousel(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/APPConfig/addCarousel',
    method: 'post',
    data
  })
}
export function deleteCarousel(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/APPConfig/deleteCarousel',
    method: 'post',
    data
  })
}
