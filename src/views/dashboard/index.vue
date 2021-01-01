<template>
  <div class="dashboard-container"
       v-loading.fullscreen.lock="fullscreenLoading">
    <div class="dashboard-text">name: {{ name }}</div>
    <div >token: {{token}}</div>
    <div> dorm: {{dormName}}</div>
    <div>student: {{studentID}}</div>
    <div>flag:{{flag}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'token',
      'dormName',
      'studentID',

    ]),

  },
  data(){
    return{
      fullscreenLoading :false,
      flag: localStorage.getItem('flag')
    }
  },
  created() {
    if(localStorage.getItem('flag')=='true'){
      this.fullscreenLoading =true;
      console.log(this.fullscreenLoading);
      setTimeout(()=>{
        this.$store.dispatch('log',this.studentID).then((response)=>{
          const { data } = response
          console.log("log的值"+data.flag)
          if (data.flag=='true'){
            this.fullscreenLoading=false
          }
          })
        },2000
      )


    }

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
