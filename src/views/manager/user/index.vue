<template>
  <div style="margin-left: 10%;margin-top: 30px">
    <el-button
      type="primary"
      @click="dialogVisible=true"
    >添加成员
    </el-button>
      <el-dialog
        title="添加成员"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <el-form :model="ruleForm" status-icon :rules="addRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="角色" prop="role">
            <el-checkbox-group v-model="ruleForm.roles">
              <el-checkbox-button v-for="role in rolesOption" :label="role" :key="role">{{role}}</el-checkbox-button>
            </el-checkbox-group>
            </el-form-item>

          <el-form-item label="工（学）号" prop="workID">
            <el-input type="workID" v-model="ruleForm.workID" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="name">
            <el-input type="username" v-model="ruleForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="管理员密码" prop="adminPassword">
            <el-input type="password" v-model="ruleForm.adminPassword" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitAdd('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      style="width: 60%">
      <el-table-column
        label="ID"
        type="index"
        style="width: 10%">
      </el-table-column>
      <el-table-column
        label="姓名"
        style="width: 20%"
        prop="name">
      </el-table-column>

      <el-table-column
        label="权限"
        sortable="custom"
        style="width: 20%"
      >
        <template slot-scope="scope">
          <span v-for="(item,index) in scope.row.role" :key="index" >{{item}}&nbsp</span>
        </template>
      </el-table-column>

      <el-table-column
        label="工号"
        sortable="custom"
        prop="workID"
        style="width: 20%"
      >
      </el-table-column>

      <el-table-column style="width: 20%" align="right" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleUnlock(scope.$index, scope.row)">解锁
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="管理员密码验证"
      :visible.sync="verifyDialogVisible"
      width="30%"
    > 请再次管理员输入密码
      <el-form
       v-model="verifyForm">
      <el-form-item
      label="管理员密码"
      :rules="[{required: true ,message: '请输入密码'}]">
      <el-input type="password" v-model="verifyForm.adminPassword" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
      <el-button type="primary" @click="submitUnlock">确认</el-button>
    </el-dialog>
    <el-dialog
      title="管理员密码验证"
      :visible.sync="deleteDialogVisible"
      width="30%"
    > 请再次管理员输入密码
      <el-form
        v-model="verifyForm">
        <el-form-item
          label="管理员密码"
          :rules="[{required: true ,message: '请输入密码'}]">
          <el-input type="password" v-model="verifyForm.adminPassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitDelete">确认</el-button>
    </el-dialog>
  </div>
</template>

<script>
import user from "@/store/modules/user";
import {validUsername} from "@/utils/validate";

export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的工号（学号）'))
      } else {
        callback()
      }
    }
    return {
      tableData: {
         role:[]
      },

      user: {
        name: '',
        role: [],
        workID: '',
      },

      rolesOption:['student','busAdmin','superAdmin'],
      ruleForm:{
        adminWorkID: this.$store.getters.workID,
        name: '',
        roles: ['student'],
        workID: '',
        password:'123456',
        adminPassword:''
      },

      addRules:{
        name :[{required: true,trigger: 'blur'}],
        role:[{required: true,trigger: 'blur'}],
        workID:[{required: true, trigger: 'blur', validator:validateUsername}],
        password:[{required: true,trigger: 'blur'}],
        adminPassword:[{required: true,trigger: 'blur'}],
      },
      verifyForm:{
        adminWorkID:this.$store.getters.workID,
        workID:'',
        adminPassword:''
      },
      adminPassword:'',
      dialogVisible:false,
      deleteDialogVisible:false,
      verifyDialogVisible:false
    }
  },
  created() {
    this.refreshTable()
  },

  methods: {
    refreshTable() {
      this.$store.dispatch('user/listUser').then(response => {
        const {data} = response
        this.tableData = data
      })
    },

    handleUnlock(index,row){
      this.verifyDialogVisible=true
      this.verifyForm.workID=row.workID
    },
    handleDelete(index,row){
      this.deleteDialogVisible=true
      this.verifyForm.workID=row.workID
    },
    submitUnlock(){
      console.log(this.verifyForm)
      this.$store.dispatch('user/unlock',this.verifyForm).then(()=>{
        this.verifyDialogVisible=false
        this.refreshTable()
        this.$notify({
          message:"解锁成功"
        })
      }).catch(() => {
      })
      this.refreshTable()
    },
    submitDelete(){
      console.log(this.verifyForm)
      this.$store.dispatch('user/deleteUser',this.verifyForm).then(()=>{
        this.deleteDialogVisible=false
        this.refreshTable()
        this.$notify({
          message:"删除成功"
        })
      }).catch(() => {
      })
      this.refreshTable()
    },
//关闭清空表单？
    submitAdd(){
      console.log(this.ruleForm)
      this.$store.dispatch('user/addUser',this.ruleForm).then(()=>{
        this.verifyDialogVisible=false
        this.refreshTable()
        this.$notify({
          message:"添加成功"
        })
      }).catch(() => {
      })
      this.refreshTable()
    },

//关闭清空表单？
    /*submitEditForm() {
      let userVo={
        name: this.user.name,
        role: this.user.role,
        workID: this.user.workID
      }
      console.log(userVo)
      this.$store.dispatch('user/modifyRole', userVo).then(() => {
        this.editDialogVisible = false
        this.refreshTable()
      }).catch(() => {
      })
      this.refreshTable()
    },*/

  }
}
</script>
<style scoped>
@import url("//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css");

.inline-search-wrapper {
  margin-top: 15px;
}

.operation-wrapper {
  float: left;
  line-height: 39px;
}

.inline-search {
  float: right;
  text-align: right;
}

.el-form--inline > .el-form-item {
  margin-bottom: 15px;
}

.el-form--inline > .el-form-item:last-child {
  margin-right: 0;
}

.page-wrapper {
  margin-top: 15px;
}
</style>
