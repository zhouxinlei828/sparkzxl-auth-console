<template>
  <div class="filter-container" style="padding-bottom: 0">
    <el-form :inline="true" size="small">
      <el-form-item label="编码">
        <el-input
          v-model="queryParam.code"
          prefix-icon="el-icon-search"
          placeholder="请输入角色编码"
        />
      </el-form-item>
      <el-form-item label="角色名称">
        <el-input
          v-model="queryParam.name"
          prefix-icon="el-icon-search"
          placeholder="请输入角色名称"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="search" @click="getRoleList()">
          查询
        </el-button>
        <el-button
          style="margin-left: 8px"
          @click="() => (this.queryParam = {})"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">角色列表</el-divider>
    <div class="filter-container">
      <el-button
        size="small"
        class="filter-item"
        icon="el-icon-plus"
        type="primary"
        @click="handleAdd"
      >
        新建
      </el-button>
      <el-button
        class="filter-item button-item"
        icon="el-icon-delete"
        type="danger"
        @click="handleBatchDelete"
      >
        批量删除
      </el-button>
    </div>
    <el-table
      v-loading="tableLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="roleData"
      border
      style="width: 100%"
      max-height="450"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        width="40"
      ></el-table-column>
      <el-table-column prop="code" label="编码"></el-table-column>
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column
        prop="describe"
        label="角色描述"
        width="180"
      ></el-table-column>
      <el-table-column prop="status" label="状态" width="80">
        <template #default="{ row }">
          <el-tag
            :type="row.status === true ? 'primary' : 'success'"
            disable-transitions
          >
            {{ row.status === true ? '启用' : '停用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-link type="primary">
            <IconFont type="icon-edit" @click="handleEdit(row)" />
          </el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link type="primary">
            <IconFont
              type="icon-template_delete"
              @click="handleDelete(row.id)"
            />
          </el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link type="primary">
            <IconFont type="icon-fenpei" @click="handleRoleUser(row.id)" />
          </el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link type="primary">
            <IconFont type="icon-shezhi" @click="handleRoleAuthority(row.id)" />
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="queryParam.pageNum"
      :page-size="queryParam.pageSize"
      :layout="layout"
      :total="total"
      :page-sizes="[5, 10, 20, 30]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <role-edit-form ref="editForm" @fetch-data="getRoleList" />
    <role-user-form ref="roleUserForm" @fetch-data="getRoleList" />
    <role-menu-resource ref="roleMenuResource" @fetch-data="getRoleList" />
  </div>
</template>

<script>
  import { deleteRole, getRoleList } from '@/api/role'
  import RoleEditForm from './modules/RoleEditForm'
  import RoleUserForm from './modules/RoleUserForm'
  import RoleMenuResource from './modules/RoleMenuResource'
  import { getUserList } from '@/api/user'
  import moment from 'moment'

  export default {
    components: {
      RoleEditForm,
      RoleUserForm,
      RoleMenuResource,
    },
    data() {
      return {
        selectedRows: [],
        tableLoading: false,
        userList: [],
        // 查询参数
        queryParam: {
          pageNum: 1,
          pageSize: 10,
          code: null,
          name: null,
        },
        total: 0,
        layout: 'total, sizes, prev, pager, next, jumper',
        roleData: [],
      }
    },
    mounted() {
      this.getRoleList()
      this.getUserList()
    },
    methods: {
      handleSelectionChange(val) {
        this.selectedRows = val
      },
      handleSizeChange(val) {
        this.queryParam.pageSize = val
        this.getRoleList()
      },
      handleCurrentChange(val) {
        this.queryParam.pageNum = val
        this.getRoleList()
      },
      getRoleList() {
        this.tableLoading = true
        const params = {
          pageNum: this.queryParam.pageNum,
          pageSize: this.queryParam.pageSize,
          model: {
            code: this.queryParam.code,
            name: this.queryParam.name,
          },
          sort: 'create_time',
        }
        getRoleList(params).then((response) => {
          const responseData = response.data
          this.total = parseInt(responseData.total)
          this.roleData = responseData.list
          for (const model of this.roleData) {
            model.createTime = moment(model.createTime).format(
              'YYYY-MM-DD HH:mm:ss'
            )
          }
          this.tableLoading = false
        })
      },
      handleAdd() {
        const createData = {
          status: '1',
        }
        this.$refs['editForm'].showDialog(createData)
      },
      handleEdit(record) {
        const data = {
          id: record.id,
          code: record.code,
          name: record.name,
          status: record.status === true ? '1' : '2',
          describe: record.describe,
        }
        this.$refs['editForm'].showDialog(data)
      },
      handleDelete(id) {
        const parameter = {
          ids: [id],
        }
        deleteRole(parameter).then((response) => {
          const responseData = response.data
          if (responseData) {
            this.$message.success('删除角色成功')
            this.getRoleList()
          } else {
            this.$message.error('删除角色失败')
          }
        })
      },
      handleBatchDelete() {
        if (this.selectedRows.length > 0) {
          const ids = []
          this.selectedRows.map((item) => ids.push(item.id))
          this.$baseConfirm('你确定要删除选中项吗', null, async () => {
            const parameter = {
              ids: ids,
            }
            debugger
            deleteRole(parameter).then((response) => {
              const responseData = response.data
              if (responseData) {
                this.$message.success('删除角色成功')
                this.getRoleList()
              } else {
                this.$message.error('删除角色失败')
              }
            })
          })
        } else {
          this.$message.error('未选中任何行')
        }
      },
      handleRoleUser(id) {
        const data = {
          id: id,
          userList: this.userList,
        }
        this.$refs['roleUserForm'].showDialog(data)
      },
      handleRoleAuthority(id) {
        const data = {
          roleId: id,
        }
        this.$refs['roleMenuResource'].showDialog(data)
      },
      getUserList() {
        if (this.userList.length === 0) {
          getUserList({}).then((response) => {
            const responseData = response.data
            for (const authUser of responseData) {
              const jsonData = {
                value: authUser.id,
                desc: authUser.name,
                disabled: false,
              }
              this.userList.push(jsonData)
            }
          })
        }
      },
      resetSearchForm() {
        this.queryParam = {
          code: '',
          name: '',
        }
      },
    },
  }
</script>
