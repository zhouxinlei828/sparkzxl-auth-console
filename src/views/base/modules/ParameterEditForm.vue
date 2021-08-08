<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="450px"
    @close="closeDialog"
  >
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="编码:" prop="code" required>
        <el-input v-model="form.code" class="edit-form-item" />
      </el-form-item>
      <el-form-item label="名称:" prop="name" required>
        <el-input v-model="form.name" class="edit-form-item" />
      </el-form-item>
      <el-form-item label="参数值:" prop="value" required>
        <el-input v-model="form.value" class="edit-form-item" />
      </el-form-item>
      <el-form-item label="状态:" prop="status">
        <el-radio v-model="form.status" label="1">启用</el-radio>
        <el-radio v-model="form.status" label="2">禁用</el-radio>
      </el-form-item>
      <el-form-item label="描述:" prop="describe">
        <el-input v-model="form.describe" type="textarea" />
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
  import { saveParameter, updateParameter } from '@/api/parameter'

  export default {
    data() {
      return {
        title: '',
        dialogFormVisible: false,
        form: {
          code: null,
          name: null,
          value: null,
          status: '1',
          describe: null,
        },
        rules: {
          code: [{ required: true, message: '编码不能为空', trigger: 'blur' }],
          name: [
            { required: true, message: '参数名称不能为空', trigger: 'blur' },
          ],
          value: [
            { required: true, message: '参数值不能为空', trigger: 'blur' },
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
          this.title = '修改参数'
        } else {
          this.title = '新增参数'
        }
        this.dialogFormVisible = true
        this.form = data
      },
      onSubmit() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            const status = parseInt(this.form.status) === 1
            const submitData = this.form
            submitData.status = status
            if (submitData.id !== undefined) {
              updateParameter(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('修改参数成功')
                  this.resetForm()
                } else {
                  this.$message.error('修改参数失败')
                }
              })
            } else {
              saveParameter(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('新增参数成功')
                  this.resetForm()
                } else {
                  this.$message.error('新增参数失败')
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
