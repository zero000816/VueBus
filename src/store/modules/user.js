import {login, logout, getInfo, listUser, addUser, modifyPassword, unlock, deleteUser} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import md5 from 'js-md5';

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles:'',
    workID:'',
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES:(state,roles) =>{
    state.roles =roles
  },
  SET_WORKID:(state,workID) =>{
    state.workID=workID
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ workID: username.trim(), password: md5(password) }).then(response => {
        //trim 表示删除头尾空白字符
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },


  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar,roles,workID} = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_ROLES',roles)
        commit('SET_WORKID',workID)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  // get user list
  listUser(){
    return new Promise((resolve, reject) => {
      listUser().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // add user
  addUser({commit}, userVO) {
    const {adminWorkID,workID,adminPassword,roles,password,name}=userVO
    return new Promise((resolve, reject) => {
      addUser({adminWorkID:adminWorkID,workID:workID,adminPassword:md5(adminPassword),roles:roles,password:md5(password),name:name}).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  modifyPassword({commit},userVO){
    const { workID, originalPassword,password } = userVO
    return new Promise((resolve, reject) => {
      modifyPassword({ workID: workID.trim(), password: md5(password),originalPassword:md5(originalPassword)}).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  unlock({commit},unlockInfo){
    const {adminWorkID,workID,adminPassword}= unlockInfo
    return new Promise((resolve,reject)=>{
      unlock({adminWorkID:adminWorkID,workID:workID,adminPassword:md5(adminPassword)}).then(response=>{
        resolve(response)
      }).catch(error=>{
        reject(error)
      })
      }
    )
  },

  deleteUser({commit},deleteInfo){
    const {adminWorkID,workID,adminPassword}= deleteInfo
    return new Promise((resolve,reject)=>{
        deleteUser({adminWorkID:adminWorkID,workID:workID,adminPassword:md5(adminPassword)}).then(response=>{
          resolve(response)
        }).catch(error=>{
          reject(error)
        })
      }
    )
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

