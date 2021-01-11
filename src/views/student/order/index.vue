<template>
<div style="margin-left: 150px;margin-top: 50px;size: B5">
  <el-button
    type="primary"
  @click="order" :disabled="disabled">提交校车选座申请</el-button>
  <el-button
    @click="information">查看</el-button>
  <el-dialog
    title="查看"
    :visible.sync="dialogVisible"
  >
    {{flag}}
  </el-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
      disabled:false,
      flag:"请等待",
      dialogVisible:false
    }
  },
  created(){
/*    this.refresh()*/
  },
  methods:{
    order(){
      this.$store.dispatch('order').then(response=>{
        this.$message({
          message: response.message,
          center: true
        });
        this.disabled=true
      })
    },
    information(){
      this.$store.dispatch('info').then(response=>{
        this.flag=response.data
        this.dialogVisible=true
      })
    }
  },

}
</script>

<style scoped>

</style>
