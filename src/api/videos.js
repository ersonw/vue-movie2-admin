import request from '@/utils/request'

export function getEditorRecommendList(data) {
  return request({
    url: '/videos/getEditorRecommendList',
    method: 'get',
    params: { data }
  })
}
export function addEditorRecommend(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/videos/addEditorRecommend',
    method: 'post',
    data
  })
}
export function updateEditorRecommend(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/videos/updateEditorRecommend',
    method: 'post',
    data
  })
}
export function deleteEditorRecommend(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/videos/deleteEditorRecommend',
    method: 'post',
    data
  })
}
export function removeEditorRecommend(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/videos/removeEditorRecommend',
    method: 'post',
    data
  })
}
export function getEditorRecommendVideoList(data) {
  return request({
    url: '/videos/getEditorRecommendVideoList',
    method: 'get',
    params: { data }
  })
}
export function getVideoOrdersList(data) {
  return request({
    url: '/videos/getVideoOrdersList',
    method: 'get',
    params: { data }
  })
}
export function removeOrderUser(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/videos/removeOrderUser',
    method: 'post',
    data
  })
}
export function deleteOrderVideo(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/videos/deleteOrderVideo',
    method: 'post',
    data
  })
}
export function getWolfFriendList(data) {
  return request({
    url: '/videos/getWolfFriendList',
    method: 'get',
    params: { data }
  })
}
export function getRecommendVideoList(data) {
  return request({
    url: '/videos/getRecommendVideoList',
    method: 'get',
    params: { data }
  })
}
export function removeWolfUser(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/videos/removeWolfUser',
    method: 'post',
    data
  })
}
export function deleteWolf(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/videos/deleteWolf',
    method: 'post',
    data
  })
}
export function getUnActorVideos(data) {
  return request({
    url: '/videos/getUnActorVideos',
    method: 'get',
    params: { data }
  })
}
export function getActorList(data) {
  return request({
    url: '/videos/getActorList',
    method: 'get',
    params: { data }
  })
}
export function getActorVideoList(data) {
  return request({
    url: '/videos/getActorVideoList',
    method: 'get',
    params: { data }
  })
}
export function getMeasurements(data) {
  return request({
    url: '/videos/getMeasurements',
    method: 'get',
    params: { data }
  })
}
export function removeActorVideo(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/videos/removeActorVideo',
    method: 'post',
    data
  })
}
export function addActor(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/videos/addActor',
    method: 'post',
    data
  })
}
export function updateActor(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/videos/updateActor',
    method: 'post',
    data
  })
}
export function deleteActor(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/videos/deleteActor',
    method: 'post',
    data
  })
}
export function addClass(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/videos/addClass',
    method: 'post',
    data
  })
}
export function updateClass(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/videos/updateClass',
    method: 'post',
    data
  })
}
export function deleteClass(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/videos/deleteClass',
    method: 'post',
    data
  })
}
export function getClassList(data) {
  return request({
    url: '/videos/getClassList',
    method: 'get',
    params: { data }
  })
}
export function addBoutique(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/videos/addBoutique',
    method: 'post',
    data
  })
}
export function updateBoutique(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/videos/updateBoutique',
    method: 'post',
    data
  })
}
export function deleteBoutique(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/videos/deleteBoutique',
    method: 'post',
    data
  })
}
export function deleteRecord(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/videos/deleteRecord',
    method: 'post',
    data
  })
}
export function getBoutiqueList(data) {
  return request({
    url: '/videos/getBoutiqueList',
    method: 'get',
    params: { data }
  })
}
export function getClass(data) {
  return request({
    url: '/videos/getClass',
    method: 'get',
    params: { data }
  })
}
export function getActor(data) {
  return request({
    url: '/videos/getActor',
    method: 'get',
    params: { data }
  })
}
export function getActorVideos(data) {
  return request({
    url: '/videos/getActorVideos',
    method: 'get',
    params: { data }
  })
}
export function update(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/videos/update',
    method: 'post',
    data
  })
}
export function deleteVideo(data) {
  data = { data: JSON.stringify(data) }
  return request({
    url: '/videos/delete',
    method: 'post',
    data
  })
}

export function getList(data) {
  return request({
    url: '/videos/list',
    method: 'get',
    params: { data }
  })
}
