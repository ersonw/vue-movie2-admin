import request from '@/utils/request'

export function getCommodityVipList(data) {
  return request({
    url: '/Commodity/getCommodityVipList',
    method: 'get',
    params: { data }
  })
}
export function addCommodityVip(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/Commodity/addCommodityVip',
    method: 'post',
    data
  })
}
export function updateCommodityVip(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/Commodity/updateCommodityVip',
    method: 'post',
    data
  })
}
export function deleteCommodityVip(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/Commodity/deleteCommodityVip',
    method: 'post',
    data
  })
}

export function getCommodityDiamondList(data) {
  return request({
    url: '/Commodity/getCommodityDiamondList',
    method: 'get',
    params: { data }
  })
}
export function addCommodityDiamond(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/Commodity/addCommodityDiamond',
    method: 'post',
    data
  })
}
export function updateCommodityDiamond(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/Commodity/updateCommodityDiamond',
    method: 'post',
    data
  })
}
export function deleteCommodityDiamond(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/Commodity/deleteCommodityDiamond',
    method: 'post',
    data
  })
}
export function getCommodityGoldList(data) {
  return request({
    url: '/Commodity/getCommodityGoldList',
    method: 'get',
    params: { data }
  })
}
export function addCommodityGold(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/Commodity/addCommodityGold',
    method: 'post',
    data
  })
}
export function updateCommodityGold(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/Commodity/updateCommodityGold',
    method: 'post',
    data
  })
}
export function deleteCommodityGold(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/Commodity/deleteCommodityGold',
    method: 'post',
    data
  })
}

