<template>
  <div>
    <el-button
      type="primary"
    >
      添加成员
    </el-button>
    <el-table
      data="users"
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
        prop="role"
        style="width: 20%"
      >
      </el-table-column>

      <el-table-column
        label="工号"
        sortable="custom"
        prop="workId"
        style="width: 20%"
      >
      </el-table-column>

      <el-table-column style="width: 20%" align="right" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
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
      title="编辑"
      :visible.sync="editDialogVisible"
      width="30%"
      model="edit">
      <el-form style="margin-left: 50px" :model="edit" size="small">
        <el-form-item label="工号">
          {{ edit.workId }}
        </el-form-item>
        <el-form-item label="姓名">
          {{ edit.name }}
        </el-form-item>
        <el-form-item label="角色">
          <el-checkbox-group v-model="edit.role">
            <el-checkbox id="high" label="high"></el-checkbox>
            <el-checkbox id="low" label='low'></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEditForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import user from "@/store/modules/user";

export default {

  data() {
    return {
      tableData: [],
      editDialogVisible: false,
      edit: {
        name: 'az',
        role: [],
        workId: '',
      },
      list:[]
    }
  },
  created() {
    this.refreshTable()
  },

  methods: {
    refreshTable() {
      this.$store.dispatch('user/listUser').then(response => {
        const {data} = response
        console.log(data)
        this.tableData = data
      })
    },

    handleEdit(index, row) {
      this.editDialogVisible = true;
      this.edit = this.copy(row)
    },
    copy(obj1) {
      let obj2 = {};
      for (let i in obj1) {
        obj2[i] = obj1[i];
      }
      return obj2;
    },

    submitEditForm() {
      let userVo={
        name: this.edit.name,
        role: this.edit.role,
        workId: this.edit.workId
      }
      console.log(userVo)
      this.$store.dispatch('user/modifyRole', userVo).then(() => {
        this.editDialogVisible = false
        this.refreshTable()
      }).catch(() => {
      })
      this.refreshTable()
    },

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
