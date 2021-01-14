import request from '@/utils/request'


export function order(token){
  return request({
    url: '/student/order',
    method: 'get',
    params: { token }
  })
}
export function info(token){
  return request({
    url: '/student/information',
    method: 'get',
    params: { token }
  })
}
