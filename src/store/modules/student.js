import {order,info} from '@/api/student'

const actions = {

  order({commit}){
    return new Promise((resolve, reject) =>{
      order().then(response=>{
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  info({commit}){
    return new Promise((resolve, reject) =>{
      info().then(response=>{
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

}

export default {
  namespace:true,
  actions
}
