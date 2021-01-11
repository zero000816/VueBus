import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import student from "@/store/modules/student";
import busAdmin from "./modules/busAdmin"
import permission from "@/store/modules/permission";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    student,
    busAdmin,
    permission
  },
  getters
})

export default store
