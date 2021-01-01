import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue/student/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue/student/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue/user/logout',
    method: 'post'
  })
}
