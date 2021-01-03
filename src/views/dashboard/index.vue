<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div >roles: {{roles}}</div>
<!--    <div >token: {{token}}</div>
    <div> dorm: {{dormName}}</div>
    <div>student: {{studentID}}</div>
    <div>flag:{{flag}}</div>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ]),

  },
  data(){
    return{
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
