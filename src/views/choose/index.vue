<template>
  <div style="margin-left: 150px">
    <el-form :model="selectForm" style="width: 530px">
      <span style="font-size: 14px;font-weight: bold;color: #444850;margin-right: 16px">宿舍楼</span>
      <el-select style="margin-bottom: 20px;margin-top: 30px"  v-model="buildingID" placeholder="请选择宿舍楼">
        <el-option
          v-for="item in buildings"
          :key="item.buildingID"
          :label="item.label"
          :value="item.buildingID ">
        </el-option>
      </el-select>
      <el-form :model="selectForm" style="width: 550px">
        <el-form-item label="您的信息">
          <el-input style="width: 200px;margin-left: 10px"
                    @change="verifyStudentID(selectForm.firstStudent.studentID)"
                    v-model="selectForm.firstStudent.studentID" placeholder="输入您的学号"></el-input>
          <el-input style="width: 200px;margin-left: 10px" v-model="selectForm.firstStudent.verifyCode"
                    placeholder="输入标识码"></el-input>
          <span style="color: red; font-size: 12px; margin-left: 60px;" v-show="selectForm.firstStudent.id_Warning.info">{{selectForm.firstStudent.id_Warning.info}}</span>
          <span style="float: right;color: red; font-size: 12px;margin-right: 180px" v-show="selectForm.firstStudent.code_Warning.show">{{selectForm.firstStudent.code_Warning.info}}</span>
        </el-form-item>
        <el-form-item
          v-for="(student, index) in selectForm.students"
          :label="'同住人' + (index+1)"
          :key="student.key">
          <el-input  style="width: 200px;margin-left: 10px" v-model="student.studentID" placeholder="输入学号"></el-input>
          <el-input  style="width: 200px;margin-left: 10px" v-model="student.verifyCode" placeholder="输入标识码"></el-input>
          <el-button @click.prevent="removeStudent(student)" style="margin-left: 10px;" size="mini" type="danger" round
                     icon="el-icon-minus"></el-button>
          <span style="color: red; font-size: 12px; margin-left: 60px;" v-show="student.id_Warning.show">{{student.id_Warning.info}}</span>
          <span style="float: right;color: red; font-size: 12px;margin-right: 180px" v-show="student.code_Warning.show">{{student.code_Warning.info}}</span>
        </el-form-item>
        <el-form-item style="float: right;margin-right: 20px">
          <el-button @click="addStudent">新增学生</el-button>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-form>
  </div>
</template>

<script>
export default {
  name:'choose',
  flag:'true',
  data() {
    return {
      buildings: [{
        buildingID: '1',
        label: '1号楼'
      }, {
        buildingID: '2',
        label: '2号楼'
      },],
      buildingID: '1',
      selectForm: {
        buildingID:'1',
        firstStudent: {
          studentID:this.$store.getters.studentID,
         verifyCode:this.$store.getters.verifyCode,
          gender: 0,
          id_Warning:{
            show:false,
            info:''
          },
          code_Warning:{
            show:false,
            info:''
          }
        },
        students: [{
          studentID: '',
          verifyCode: '',
          gender: 0,
          id_Warning:{
            show:false,
            info:''
          },
          code_Warning:{
            show:false,
            info:''
          }
        }],
      }
    }
  },
  methods:{
    submit() {
        let form = {
          buildingID: this.selectForm.buildingID,
          firstStudent:this.selectForm.firstStudent.studentID,
          gender: this.selectForm.firstStudent.gender,
          studentIDs:[this.selectForm.firstStudent.studentID]
        }
        for (let i in this.selectForm.students){
          form.studentIDs.push(this.selectForm.students[i].studentID)
        }
        console.log(form)
        localStorage.setItem('flag','true')
        console.log(localStorage.getItem('flag'))
        this.$store.dispatch('submit',form)
        this.$router.push("/")
        window.location.reload()
    },
    addStudent() {
      if (this.selectForm.students.length == 5) {
        this.$message({
          message: '至多绑定5名学生',
          showClose: true,
          type: 'warning'
        });
        return;
      }
      this.selectForm.students.push({
        studentID: '',
        verifyCode: '',
        gender: 0,
        key: Date.now(),
        id_Warning:{
          show:false,
          info:''
        },
        code_Warning:{
          show:false,
          info:''
        }
      })
    },
    removeStudent(item) {
      if (this.selectForm.students.length == 1) {
        this.$message({
          message: '表单不能为空',
          showClose: true,
          type: 'warning'
        })
        return
      }
      let index = this.selectForm.students.indexOf(item)
      if (index !== -1) {
        this.selectForm.students.splice(index, 1)
      }
    },
    async getStudent(studentID) {
      const {data} = await this.$store.dispatch("getStudent", studentID)
      console.log(data.student)
      return data.student
    },
    async verifyStudentID(studentID,index) {
      console.log(studentID)
      let student = await this.getStudent(studentID)
      if (student == null) {
        this.selectForm.firstStudent.id_Warning = {
          show:true,
          info:'学生不存在'
        }
        return
      }
      console.log(student)
      if (student.dormName != "" && student.dormName!=null){
        this.selectForm.firstStudent.id_Warning = {
          show:true,
          info:'该学生已被分配宿舍'
        }
        return
      }
      /*this.selectForm.students[index].gender = student.gender
      if (!this.verifyGender(student)){
        this.selectForm.students[index].id_Warning = {
          show:true,
          info:'该学生性别和其他学生不同！'
        }
        return
      }*/
      this.selectForm.firstStudent.id_Warning = {
        show:false,
        info:''
      }
    },


  }

}
</script>

<style lang="scss">
</style>
