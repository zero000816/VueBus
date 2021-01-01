import request from '@/utils/request'

export function listStudents(){
  return request({
    url: '/vue/student/list',
    method: 'get'
  })
}
export function addStudent(data){
  return request({
    url: '/vue/student/add',
    method: 'post',
    data
  })
}
export function getStudent(studentID){
  return request({
    url: 'vue/student/getStudent',
    method: 'get',
    params:{studentID}
  })
}

export function log(studentID){
  return request({
    url: 'vue/student/log',
    method: 'get',
    params:{studentID}
  })
}

export function submit(data){
  return request({
    url: '/vue/student/submit',
    method: 'post',
    data
  })

}
