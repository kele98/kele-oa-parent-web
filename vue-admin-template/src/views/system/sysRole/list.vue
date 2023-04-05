<template>
  <div class="app-container">

    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="角色名称">
        <el-input placeholder="角色名称" v-model="selectSysRole.roleName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="findOnPage()">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="resetSysRoleName()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="selectSysRoleList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column align="center" label="用户ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
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
          <el-button  @click="showAssignAuth(scope.row)" >分配</el-button>
        </template>

      </el-table-column>
    </el-table>
      <el-button type="primary" @click="dialogFormVisible=true">添加</el-button>
      <el-button type="primary" @click="batchDelete()" >批量删除</el-button>
    <template>
      <el-pagination
        :total="total"
        :current-page="currentIndex"
        :page-size="limit"
        layout="total, prev, pager, next, jumper"
        @current-change="findOnPage"
        />
    </template>
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
      <el-form :model="SysRole">
        <el-form-item label="名称" label-width="120px">
          <el-input v-model="SysRole.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Code" label-width="120px">
          <el-input v-model="SysRole.roleCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="120px">
          <el-input v-model="SysRole.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false ; resetSysRole()">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false ; updateSysRole()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/admin/system/sysRole'

export default {
  name: 'List',
  data() {
    return {
      selectSysRoleList: [],
      currentIndex: 1,
      limit: 5,
      selectSysRole: {
        roleName: ''
      },
      total: 1,
      dialogFormVisible: false,
      SysRole: {
        id: '',
        roleName: '',
        roleCode: '',
        description: ''
      },
      multipleSelection: []
    }
  },
  created() {
    this.findOnPage()
  },
  methods: {
    // 跳转到菜单分配页面
    showAssignAuth(row) {
      this.$router.push('/assignAuth?id=' + row.id + '&roleName=' + row.roleName)
    },
    // 分页查询
    findOnPage(index = 1) {
      this.currentIndex = index
      console.log('当前页' + this.currentIndex)
      api.findOnPage(this.currentIndex, this.limit, this.selectSysRole).then(response => {
        if (response.data != null) {
          this.selectSysRoleList = response.data.records
          this.total = response.data.total
        }
      }
      )
    },
    // 重置条件
    resetSysRoleName() {
      this.selectSysRole.name = ''
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
    updateSysRole() {
      if (this.SysRole.id !== '') {
        // 修改
        api.update(this.SysRole).then(response => {
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
          this.resetSysRole()
        })
      } else {
        // 添加
        api.save(this.SysRole).then(response => {
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
          this.resetSysRole()
        })
      }
    },
    // 修改Click事件
    modifiy(SysRole) {
      this.SysRole.id = SysRole.id
      this.SysRole.roleCode = SysRole.roleCode
      this.SysRole.roleName = SysRole.roleName
      this.SysRole.description = SysRole.description
      this.dialogFormVisible = true
    },
    // 初始化数据
    resetSysRole() {
      this.SysRole.id = ''
      this.SysRole.roleCode = ''
      this.SysRole.roleName = ''
      this.SysRole.description = ''
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
