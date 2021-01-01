import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    dormName: '',
    studentID: '',
    verifyCode:'',
    flag:''
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
  SET_DORM: (state, dormName) => {
    state.dormName = dormName
  },
  SET_STUDENT: (state, studentID) => {
    state.studentID = studentID
  },
  SET_VERIFYCODE:(state,verifyCode)=>{
    state.verifyCode=verifyCode
  },
  SET_FLAG: (state,flag)=>{
    state.flag=flag
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ studentID: username.trim(), verifyCode: password }).then(response => {
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

        const { name, avatar,dormName,studentID,verifyCode} = data
        if(dormName==""||dormName==null){
          commit('SET_DORM',"未分配")
        }
        else {
          commit('SET_DORM', dormName)
        }
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_STUDENT',studentID)
        commit('SET_VERIFYCODE',verifyCode)

/*        if (this.getters.flag===''){
          console.log("test")
          commit('SET_FLAG','false')
        }*/
        console.log("每次刷新都要进入主界面吗")
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
  change({ commit }) {
    return new Promise(resolve => {
      commit('SET_FLAG',"true")
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

