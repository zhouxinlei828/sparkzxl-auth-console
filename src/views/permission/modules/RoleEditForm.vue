<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="700px"
    @close="closeDialog"
  >
    <el-form
      ref="ruleForm"
      :model="form"
      :inline="true"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="编码:" prop="code" required>
        <el-input v-model="form.code" class="edit-form-item" />
      </el-form-item>
      <el-form-item label="角色名称:" prop="name" required>
        <el-input v-model="form.name" class="edit-form-item" />
      </el-form-item>
      <el-form-item label="状态:" prop="status">
        <el-radio v-model="form.status" label="1">启用</el-radio>
        <el-radio v-model="form.status" label="2">禁用</el-radio>
      </el-form-item>
      <el-form-item label="角色描述:" prop="describe">
        <el-input
          v-model="form.describe"
          type="textarea"
          style="width: 510px"
        />
      </el-form-item>
    </el-form>
    <el-divider content-position="left">角色自定义属性</el-divider>
    <div class="filter-container">
      <el-button
        size="small"
        class="filter-item"
        icon="el-icon-plus"
        type="primary"
        @click="handleAddRoleAttribute"
      >
        新建
      </el-button>
    </div>
    <el-table :data="attributes" border style="width: 100%" max-height="450">
      <el-table-column type="index" label="序号" width="55"></el-table-column>
      <el-table-column prop="attributeKey" label="属性key">
        <template #default="{ row }">
          <el-input v-model="row.attributeKey" />
        </template>
      </el-table-column>
      <el-table-column prop="attributeValue" label="属性值">
        <template #default="{ row }">
          <el-input v-model="row.attributeValue" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-link type="primary">
            <IconFont
              type="icon-template_delete"
              @click="handleDeleteRoleAttribute(scope.$index)"
            />
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" class="button-item" @click="closeDialog">
        取 消
      </el-button>
      <el-button
        size="small"
        class="button-item"
        type="primary"
        @click="onSubmit"
      >
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { saveRole, updateRole } from '@/api/role'
  import { objToArray } from '@/utils/util'

  export default {
    data() {
      return {
        title: '',
        dialogFormVisible: false,
        form: {
          code: null,
          name: null,
          status: '1',
          describe: null,
          attribute: null,
        },
        attributes: [],
        rules: {
          code: [{ required: true, message: '编码不能为空', trigger: 'blur' }],
          name: [
            { required: true, message: '角色名称不能为空', trigger: 'blur' },
          ],
          status: [
            { required: true, message: '状态不能为空', trigger: 'blur' },
          ],
        },
        status: 1,
      }
    },
    methods: {
      showDialog(data) {
        if (data.id !== undefined) {
          this.title = '修改角色'
          this.attributes = objToArray(data.attribute)
        } else {
          this.title = '新增角色'
          this.attributes = []
        }
        this.dialogFormVisible = true
        this.form = data
        console.log(this.attributes)
      },
      onSubmit() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            const status = parseInt(this.form.status) === 1
            const submitData = this.form
            submitData.status = status
            const attribute = {}
            const attributes = this.attributes
            if (attributes.length > 0) {
              for (const data of attributes) {
                attribute[data.attributeKey] = data.attributeValue
              }
              submitData.attribute = attribute
            } else {
              submitData.attribute = null
            }
            if (submitData.id !== undefined) {
              updateRole(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('修改角色成功')
                  setTimeout(() => {
                    this.resetForm()
                  }, 1000)
                } else {
                  this.$message.error('修改角色失败')
                }
              })
            } else {
              saveRole(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('新增角色成功')
                  setTimeout(() => {
                    this.resetForm()
                  }, 1000)
                } else {
                  this.$message.error('新增角色失败')
                }
              })
            }
          } else {
            return false
          }
        })
      },
      handleAddRoleAttribute() {
        let attributes = this.attributes
        if (attributes === undefined || attributes === null) {
          attributes = []
        }
        attributes.push({
          attributeKey: '',
          attributeValue: '',
        })
        this.attributes = attributes
      },
      handleDeleteRoleAttribute(index) {
        this.attributes.splice(index, 1)
        console.log(this.attributes)
      },
      resetForm() {
        this.$refs['ruleForm'].resetFields()
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      closeDialog() {
        this.$refs['ruleForm'].resetFields()
        this.dialogFormVisible = false
      },
    },
  }
</script>
