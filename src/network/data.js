import { request } from './request'
export const getData = () => {
  return request({
    url: '/home',
    method: 'get'
  })
}

export const getUser = (params) => {
  console.log(params.page);
  return request({
    url: '/user/getUser',
    method: 'get',
    params
  })
}

export const getMenu = (param) => {
  return request({
    url: '/permission/getMenu',
    method: 'post',
    data: param
  })
}