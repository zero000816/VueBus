<template>
  <div style="margin-left: 150px;margin-top: 50px" >
    <el-form :model="busForm" status-icon :rules="rules" ref="busForm" label-width="100px"  style="width: 40%">
      <el-form-item label="管理员密码" prop="password">
        <el-input type="password" v-model="busForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="乘车人数" prop="number">
        <el-input-number v-model="busForm.number"  :min="0" :max="100" label="人数"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('busForm')">提交</el-button>
        <el-button @click="resetForm('busForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>


export default {
  data() {
    return {
      busForm: {
        workID: this.$store.getters.workID,
        password: '',
        number: 0,
      },
      outerVisible:false,
      rules: {
        password: [{ required: 'true', trigger: 'blur' }],
        number: [{ required: 'true', trigger: 'blur' }],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.busForm)
          this.$store.dispatch('submitBus',this.busForm).then(()=> {
            console.log(this.busForm)
            /*this.$router.push({path: this.redirect || '/busPassenger'})*/
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
}
</script>
