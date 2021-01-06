import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function listUser(){
  return request({
    url: '/user/list',
    method: 'get',
  })
}

export function addUser(data){
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}
export function modifyPassword(data){
  return request({
    url: '/user/modify',
    method: 'post',
    data
  })
}

export function unlock(data){
  return request({
    url: '/user/unlock',
    method: 'post',
    data
  })
}

export function deleteUser(data){
  return request({
    url: 'user/deleteUser',
    method:'post',
    data
  })

}
