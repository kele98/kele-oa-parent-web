<template>
  <div class="app-container">

    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="搜索关键字">
        <el-input placeholder="用户名称" v-model="selectSysUser.keyword"></el-input>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="selectSysUser.createTimeBegin"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
          v-model="selectSysUser.createTimeEnd"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="findOnPage()">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="resetSysUserName()">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dialogFormVisible=true">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="selectSysUserList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="用户id" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="岗位">
      </el-table-column>
      <el-table-column label="部门">
      </el-table-column>
      <el-table-column label="所属角色">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="selectSysUserList[scope.$index].status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="updateStatus(scope.row.id,scope.row.status)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="modifiy(scope.row)">修改</el-button>
          <el-popconfirm
              title="此操作无法取消，您确定要删除吗？"
              @onConfirm="remove(scope.row.id)"
            >
            <el-button slot="reference">删除</el-button>
          </el-popconfirm>
          <el-button slot="reference" @click="assignFormVisible = true ; getUserRole(scope.row)">分配</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template>
      <el-pagination
        :total="total"
        :current-page="currentIndex"
        :page-size="limit"
        layout="total, prev, pager, next, jumper"
        @current-change="findOnPage"
        />
    </template>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="SysUser">
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="SysUser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" label-width="120px">
          <el-input v-model="SysUser.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="SysUser.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="120px">
          <el-input v-model="SysUser.phone " autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门id" label-width="120px">
          <el-input v-model="SysUser.deptId" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false ; resetSysUser()">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false ; updateSysUser()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="分配用户" :visible.sync="assignFormVisible">
      <el-form >
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="assignUserDate.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="角色列表" label-width="120px">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedRoles" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="role in roles" :label="role" :key="role.index">{{role}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="assignFormVisible = false ; ">取 消</el-button>
        <el-button type="primary" @click="assignFormVisible = false ; assignUser()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/admin/system/sysUser'
import roleApi from '@/api/admin/system/sysRole'
export default {
  name: 'List',
  data() {
    return {
      assignUserDate: {
        username: '',
        userId: '',
        roleIdList: []
      },
      checkAll: false,
      isIndeterminate: true,
      // 这里使用两个备份放原始数据 下边的两个用来放名字 因为vue的check遇上对象有bug 默认勾选会无效
      rawCheckedRoles: [],
      rawRoles: [],
      checkedRoles: [],
      roles: [],
      selectSysUserList: [],
      currentIndex: 1,
      limit: 5,
      selectSysUser: {
        keyword: '',
        createTimeBegin: '',
        createTimeEnd: ''
      },
      total: 1,
      dialogFormVisible: false,
      assignFormVisible: false,
      SysUser: {
        id: '',
        status: 1
      }
    }
  },
  created() {
    this.findOnPage()
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedRoles = val ? this.roles : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.roles.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.roles.length
    },
    updateStatus(user_id, status) {
      // 状态取反
      status = status === true ? 1 : 0
      api.updateStatus(user_id, status).then(response => {
        if (response.code === 200) {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
          // 刷新数据
          this.findOnPage()
        } else {
          this.$message({
            message: '更新失败',
            type: 'error'
          })
        }
      })
    },
    // 分页查询
    findOnPage(index = 1) {
      this.currentIndex = index
      console.log('当前页' + this.currentIndex)
      api.findOnPage(this.currentIndex, this.limit, this.selectSysUser).then(response => {
        if (response.data != null) {
          this.selectSysUserList = response.data.records
          this.selectSysUserList.forEach(obj => {
            if (obj.status === 1) {
              obj.status = true
            } else {
              obj.status = false
            }
          })
          this.total = response.data.total
        }
      }
      )
    },
    // 获取用户的角色
    getUserRole(user) {
      this.assignUserDate.username = user.username
      this.assignUserDate.userId = user.id
      roleApi.getUserRole(user.id).then(response => {
        if (response.code === 200) {
          this.rawCheckedRoles = response.data.assignList
          this.rawRoles = response.data.sysRoleList
          console.log(this.checkedRoles)
          // 对原始数据遍历获取名字
          let temp = []
          this.rawCheckedRoles.forEach(obj => temp.push(obj.roleName))
          this.checkedRoles = temp
          temp = []
          this.rawRoles.forEach(obj => temp.push(obj.roleName))
          this.roles = temp
        }
      })
    },
    // 分配角色
    assignUser() {
      this.rawRoles.forEach(obj => {
        if (this.checkedRoles.indexOf(obj.roleName) !== -1) {
          this.assignUserDate.roleIdList.push(obj.id)
          console.log(this.assignUserDate.roleIdList)
        }
      })
      console.log(this.assignUserDate)
      roleApi.assignUser(this.assignUserDate).then(response => {
        if (response.code === 200) {
          this.$message({
            message: '分配成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '分配失败',
            type: 'error'
          })
        }
      })
      // 重置条件
      this.assignUserDate.userId = ''
      this.assignUserDate.username = ''
      this.assignUserDate.roleIdList = []
    },
    // 重置条件
    resetSysUserName() {
      this.selectSysUser.keyword = ''
      this.selectSysUser.createTimeEnd = ''
      this.selectSysUser.createTimeBegin = ''
      this.findOnPage()
    },
    // 删除
    remove(id) {
      api.deleteById(id).then(response => {
        if (response.code === 200) {
          this.findOnPage()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    // 添加或修改
    updateSysUser() {
      if (this.SysUser.id !== '') {
        // 修改
        api.update(this.SysUser).then(response => {
          if (response.code === 200) {
            this.findOnPage()
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '修改失败',
              type: 'error'
            })
          }
          this.resetSysUser()
        })
      } else {
        // 添加
        api.save(this.SysUser).then(response => {
          if (response.code === 200) {
            this.findOnPage()
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '添加失败',
              type: 'error'
            })
          }
          this.resetSysUser()
        })
      }
    },
    // 修改Click事件
    modifiy(SysUser) {
      this.SysUser.id = SysUser.id
      this.SysUser.name = SysUser.name
      this.SysUser.username = SysUser.username
      this.SysUser.password = SysUser.password
      this.SysUser.phone = SysUser.phone
      this.SysUser.deptId = SysUser.deptId
      this.SysUser.status = SysUser.status
      this.dialogFormVisible = true
    },
    // 初始化数据
    resetSysUser() {
      this.SysUser.id = ''
      this.SysUser.name = ''
      this.SysUser.username = ''
      this.SysUser.password = ''
      this.SysUser.phone = ''
      this.SysUser.deptId = ''
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    batchDelete() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '未选中要删除的数据',
          type: 'error'
        })
        return
      }
      const idList = []
      this.multipleSelection.forEach(item => {
        idList.push(item.id)
      })
      api.batchDeleteById(idList).then(response => {
        if (response.code === 200) {
          this.findOnPage()
          this.$message({
            message: '批量删除成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '批量失败',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
