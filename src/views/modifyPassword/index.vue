<template>
  <div class="modify-container">
    <el-form ref="modifyForm" :model="modifyForm" :rules="modifyRules" class="modify-form" auto-complete="on"
             label-position="left">

      <div class="title-container">
        <h3 class="title">修改密码</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          ref="username"
          v-model="modifyForm.username"
          placeholder="工号（学号）"
          name="username"
          type="text"
          tabindex="1"
          readonly="readonly"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="originalPassword">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :key="passwordType"
          ref="originalPassword"
          v-model="modifyForm.originalPassword"
          :type="passwordType"
          placeholder="原密码"
          name="originalPassword"
          tabindex="2"

          auto-complete="on"
        />

      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="modifyForm.password"
          :type="passwordType"
          placeholder="新密码"
          name="password"
          tabindex="3"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="verifyPassword">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
          <el-input
            :key="passwordType"
            v-model="modifyForm.verifyPassword"
            :type="passwordType"
            placeholder="重复确认"
            tabindex="4"
            @change="handleTest"
            @keyup.enter.native="handleModify"
          />
      </el-form-item>
      <div>
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                   @click.native.prevent="handleModify">修改密码
        </el-button>
      </div>
    </el-form>
  </div>


</template>

<script>
import {validUsername,validPassword} from '@/utils/validate'

export default {
  name: 'ModifyPassword',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!validPassword(value)) {
        callback(new Error('wrong'))
      } else {
        callback()
      }
    }
    return {
      modifyForm: {
        username: this.$store.getters.workID,
        originalPassword: '123456',
        password:'',
        verifyPassword:''
      },
      modifyRules: {
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePassword}],
        originalPassword: [{required: true, trigger: 'blur', }],
        verifyPassword:[{required: true, trigger: 'blur',}]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      flag: false,
      //用来判断两次密码是否一致
      readonly:true
    }

  },

  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },

  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleTest(){
        if(this.modifyForm.password==this.modifyForm.verifyPassword){
          this.flag=true,
          console.log("success")
        }
        else{
          this.$message({
            message:"两次输入密码不同",
            type:'warning'
          })
        }
    },

    handleModify() {

      let form={
        workID: this.$store.getters.workID,
        originalPassword: this.modifyForm.originalPassword,
        password:this.modifyForm.password ,
      }
/*       console.log(form)*/
       this.$refs.modifyForm.validate(valid => {
         if (valid && this.flag) {
           this.loading = true
           this.$store.dispatch('user/modifyPassword', form).then((response) => {
             this.$router.push({path: this.redirect || '/'})
             this.loading = false
           }).catch(() => {
             this.loading = false
           })
         } else {
           console.log('error submit!!')
           return callback()
         }
       })
    },


  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .modify-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.modify-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.modify-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .modify-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
