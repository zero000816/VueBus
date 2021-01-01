import {addStudent, getStudent, listStudents,submit,log} from '@/api/student'

const actions = {
  listStudents({commit}){
    return new Promise((resolve, reject) =>{
      listStudents().then(response=>{
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  addStudent({commit}, studentVO){
    return new Promise((resolve, reject) =>{
      addStudent(studentVO).then(response=>{
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  submit({commit},form){

    return new Promise((resolve, reject) =>{
      submit(form).then(response=>{
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getStudent({commit},studentID) {
    return new Promise((resolve, reject) =>{
      getStudent(studentID).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  log({commit},studentID) {
    return new Promise((resolve, reject) =>{
      log(studentID).then(response => {

        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }

}

export default {
  namespace:true,
  actions
}
