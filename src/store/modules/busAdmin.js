import {submitBus,listPassenger} from "@/api/busAdmin";
import md5 from 'js-md5';

const actions = {

submitBus({commit},form){
  const {workID,password,number}=form
  return new Promise((resolve, reject) =>{
    submitBus({workID:workID,password:md5(password),number:number}).then(response=>{
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
},

  // get passenger list
    listPassenger(){
    return new Promise((resolve, reject) => {
      listPassenger().then(response => {
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
