<template>
  <el-dialog
    title="添加菜单资源"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="closeDialog"
  >
    <el-form
      ref="ruleForm"
      :model="form"
      :inline="true"
      :rules="rules"
      :label-position="labelPosition"
      size="small"
      label-width="120px"
    >
      <el-divider content-position="left">菜单资源操作</el-divider>
      <el-form-item label="编码:" prop="code" required>
        <el-tooltip
          class="item"
          effect="dark"
          content="建议使用:作为分隔符，如：menu:add、 resource:view、 file:upload"
          placement="top"
        >
          <el-input v-model="form.code" class="edit-form-item" />
        </el-tooltip>
      </el-form-item>
      <el-form-item label="名称:" prop="name" required>
        <el-input v-model="form.name" class="edit-form-item" />
      </el-form-item>
      <el-form-item label="请求路径:" prop="requestUrl" required>
        <el-input v-model="form.requestUrl" class="edit-form-item" />
      </el-form-item>
      <el-form-item label="描述:" prop="describe">
        <el-input v-model="form.describe" class="edit-form-item" />
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button
        size="small"
        class="button-item"
        type="primary"
        @click="onSubmit"
      >
        保存
      </el-button>
      <el-button size="small" style="margin-left: 8px" @click="resetForm">
        重置
      </el-button>
    </div>
    <el-divider content-position="left">菜单资源列表</el-divider>
    <el-table
      v-loading="tableLoading"
      :data="resourceList"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      border
      style="width: 100%"
      max-height="200"
    >
      <el-table-column prop="code" width="200" label="编码"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column label="操作" align="center" width="100">
        <template #default="{ row }">
          <el-link type="primary">
            <IconFont type="icon-edit" @click="handleEditResource(row)" />
          </el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link type="primary">
            <IconFont
              type="icon-template_delete"
              @click="handleDeleteResource(row.id)"
            />
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button
        size="small"
        class="button-item"
        type="primary"
        @click="confirmCloseForm"
      >
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {
    deleteResource,
    getMenuResource,
    saveResource,
    updateResource,
  } from '@/api/menu'

  export default {
    data() {
      return {
        dialogFormVisible: false,
        tableLoading: false,
        form: {
          id: null,
          code: null,
          name: null,
          describe: null,
          menuId: 0,
          requestUrl: null,
        },
        resourceList: [],
        labelPosition: 'right',
        rules: {
          code: [{ required: true, message: 'code不能为空', trigger: 'blur' }],
          name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
          requestUrl: [
            { required: true, message: '请求路径不能为空', trigger: 'blur' },
          ],
        },
      }
    },
    methods: {
      showDialog(data) {
        this.form.menuId = data.menuId
        this.getMenuResource()
        this.dialogFormVisible = true
      },
      onSubmit() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            const submitData = this.form
            if (submitData.id !== null) {
              updateResource(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('修改资源成功')
                  this.getMenuResource()
                } else {
                  this.$message.error('修改资源失败')
                }
              })
            } else {
              saveResource(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('新增资源成功')
                  this.getMenuResource()
                } else {
                  this.$message.error('新增资源失败')
                }
              })
            }
          } else {
            return false
          }
        })
      },
      resetForm() {
        this.form.id = null
        this.form.code = null
        this.form.name = null
        this.form.requestUrl = null
        this.form.describe = null
      },
      confirmCloseForm() {
        this.$refs['ruleForm'].resetFields()
        this.resourceList = []
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      handleEditResource(record) {
        this.form.id = record.id
        this.form.code = record.code
        this.form.name = record.name
        this.form.requestUrl = record.requestUrl
        this.form.describe = record.describe
      },
      handleDeleteResource(id) {
        deleteResource({ ids: [id] }).then((response) => {
          const responseData = response.data
          if (responseData) {
            this.$message.success('删除菜单资源成功')
            this.getMenuResource()
          } else {
            this.$message.error('删除菜单资源失败')
          }
        })
      },
      getMenuResource() {
        this.tableLoading = true
        getMenuResource({ menuId: this.form.menuId }).then((response) => {
          this.resourceList = response.data
          this.tableLoading = false
        })
      },
      closeDialog() {
        this.$refs['ruleForm'].resetFields()
        this.resourceList = []
        this.dialogFormVisible = false
      },
    },
  }
</script>
