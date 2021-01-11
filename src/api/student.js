import request from '@/utils/request'


export function order(token){
  return request({
    url: '/bus/order',
    method: 'get',
    params: { token }
  })
}
export function info(token){
  return request({
    url: '/bus/information',
    method: 'get',
    params: { token }
  })
}
