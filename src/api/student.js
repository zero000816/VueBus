import request from '@/utils/request'

export function listStudents(){
  return request({
    url: '/student/list',
    method: 'get'
  })
}

export function submit(data){
  return request({
    url: '/student/submit',
    method: 'post',
    data
  })

}
