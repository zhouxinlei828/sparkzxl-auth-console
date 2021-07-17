<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="450px"
    @close="closeDialog"
  >
    <el-form
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-position="labelPosition"
      size="small"
      label-width="120px"
    >
      <el-form-item label="账号:" prop="account" required>
        <el-input v-model="form.account" class="edit-form-item" />
      </el-form-item>
      <el-form-item label="姓名:" prop="name" required>
        <el-input v-model="form.name" class="edit-form-item" />
      </el-form-item>
      <el-form-item label="状态:" prop="status">
        <el-radio v-model="form.status" label="1">启用</el-radio>
        <el-radio v-model="form.status" label="2">禁用</el-radio>
      </el-form-item>
    </el-form>
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
  import { saveUser, updateUser } from '@/api/process-user'

  export default {
    props: {
      model: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        title: '新增用户',
        form: {
          account: null,
          name: null,
          status: '1',
        },
        labelPosition: 'right',
        rules: {
          account: [
            { required: true, message: '账号不能为空', trigger: 'blur' },
          ],
          name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        },
        dialogFormVisible: false,
        status: 1,
      }
    },
    created() {},
    methods: {
      showDialog(data) {
        if (data.id !== undefined) {
          this.title = '修改用户'
        } else {
          this.title = '新增用户'
        }
        this.dialogFormVisible = true
        this.form = data
      },
      loadListOptions({ callback }) {
        callback()
      },
      onSubmit() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            const status = parseInt(this.form.status) === 1
            const submitData = this.form
            submitData.status = status
            if (this.form.id !== undefined) {
              submitData.id = this.form.id
              updateUser(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('修改用户成功')
                  setTimeout(() => {
                    this.resetForm()
                  }, 1000)
                } else {
                  this.$message.error('修改用户失败')
                }
              })
            } else {
              saveUser(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('新增用户成功')
                  this.$refs['ruleForm'].resetFields()
                  this.dialogFormVisible = false
                  setTimeout(() => {
                    this.resetForm()
                  }, 1000)
                } else {
                  this.$message.error('新增用户失败')
                }
              })
            }
          } else {
            return false
          }
        })
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
