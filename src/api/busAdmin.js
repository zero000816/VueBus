import request from '@/utils/request'

export function listPassenger(){
  return request({
    url: '/bus/list',
    method: 'get'
  })
}

export function submitBus(data) {
  return request({
    url: '/bus/submit',
    method: 'post',
    data
  })
}

