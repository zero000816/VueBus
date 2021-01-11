<template>
  <div>
 <div STYLE="margin-left: 10%;margin-top: 30px">
   <span>乘车人数: </span>
   <el-input-number v-model="num" :disabled="true"></el-input-number>
 </div>
    <div style="margin-left: 150px;margin-top: 10px">
      <el-table
        ref="multipleTable"
        :data="passengerData"
        border
        style="width: 40%">
        <el-table-column
          label="ID"
          type="index"
          style="width: 10%">
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="name"
          style="width: 30%"
        >
        </el-table-column>
        <el-table-column
          label="学号"
          prop="workID"
          style="width: 30%"
        >

        </el-table-column>
        </el-table>
    </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      num: localStorage.getItem("passengerNum"),
      passengerData:[{
        name:'az',
        workID:'',
      },]
    }
  },
  created(){
    this.refreshTable()
  },
  methods:{
    refreshTable(){
      this.$store.dispatch('listPassenger').then(response=>{
        const {data}=response
        this.passengerData =response.data
      })
    }
  }
}
</script>

<style scoped>

</style>
