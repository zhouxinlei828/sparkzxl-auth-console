<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="closeDialog"
  >
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="租户名称:" prop="name" required>
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="租户logo:" prop="logo">
        <el-input v-model="form.logo" />
      </el-form-item>
      <el-form-item label="状态:" prop="status">
        <el-radio v-model="form.status" label="1">启用</el-radio>
        <el-radio v-model="form.status" label="2">禁用</el-radio>
      </el-form-item>
      <el-form-item label="简介:" prop="describe">
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
  import { saveTenant, updateTenant } from '@/api/tenant'
  export default {
    data() {
      return {
        title: '',
        dialogFormVisible: false,
        form: {
          id: null,
          name: null,
          logo: null,
          status: '1',
          describe: null,
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now()
          },
          shortcuts: [
            {
              text: '今天',
              onClick(picker) {
                picker.$emit('pick', new Date())
              },
            },
            {
              text: '明天',
              onClick(picker) {
                const date = new Date()
                date.setTime(date.getTime() + 3600 * 1000 * 24)
                picker.$emit('pick', date)
              },
            },
          ],
        },
        rules: {
          name: [
            { required: true, message: '租户池名称不能为空', trigger: 'blur' },
          ],
          status: [
            { required: true, message: '状态不能为空', trigger: 'blur' },
          ],
        },
      }
    },
    created() {},
    methods: {
      showDialog(data) {
        if (data.id !== undefined && data.id !== null) {
          this.title = '修改租户池'
        } else {
          this.title = '新增租户池'
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
            if (submitData.id === null) {
              saveTenant(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('新增租户池成功')
                  this.resetForm()
                } else {
                  this.$message.error('新增租户池失败')
                }
              })
            } else {
              submitData.id = this.form.id
              updateTenant(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('修改租户池成功')
                  this.resetForm()
                } else {
                  this.$message.error('修改租户池失败')
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
