<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="closeDialog"
  >
    <el-form
      ref="ruleForm"
      :model="form"
      :inline="true"
      :rules="rules"
      label-width="140px"
    >
      <el-form-item label="租户名称:" prop="name" required>
        <el-input v-model="form.name" class="edit-form-item" />
      </el-form-item>
      <el-form-item label="租户logo:" prop="logo">
        <el-input v-model="form.logo" class="edit-form-item" />
      </el-form-item>
      <el-form-item label="有效期:" prop="expirationTime">
        <el-date-picker
          v-model="form.expirationTime"
          style="width: 200px"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="用户密码有效期:" prop="passwordExpire" required>
        <el-tooltip
          class="item"
          effect="dark"
          content="单位：秒"
          placement="right"
        >
          <el-input-number
            v-model="form.passwordExpire"
            class="edit-form-item"
            controls-position="right"
            :min="0"
          />
        </el-tooltip>
      </el-form-item>
      <el-form-item label="密码输错次数:" prop="passwordErrorNum" required>
        <el-input-number
          v-model="form.passwordErrorNum"
          class="edit-form-item"
          controls-position="right"
          :min="0"
          :max="10"
        />
      </el-form-item>
      <el-form-item label="账号锁定时间:" prop="passwordErrorLockTime" required>
        <el-tooltip
          class="item"
          effect="dark"
          content="单位：秒"
          placement="right"
        >
          <el-input-number
            v-model="form.passwordErrorLockTime"
            class="edit-form-item"
            controls-position="right"
            :min="30"
          />
        </el-tooltip>
      </el-form-item>
      <el-form-item label="状态:" prop="status">
        <el-radio v-model="form.status" label="1">启用</el-radio>
        <el-radio v-model="form.status" label="2">禁用</el-radio>
      </el-form-item>
      <el-form-item label="租户简介:" prop="describe">
        <el-input
          v-model="form.describe"
          type="textarea"
          style="width: 550px"
        />
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
          expirationTime: null,
          passwordExpire: 0,
          passwordErrorNum: 0,
          passwordErrorLockTime: 30,
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
            { required: true, message: '租户名称不能为空', trigger: 'blur' },
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
          this.title = '修改租户'
        } else {
          this.title = '新增租户'
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
            console.log(submitData)
            if (submitData.id === null) {
              saveTenant(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('新增租户成功')
                  this.resetForm()
                } else {
                  this.$message.error('新增租户失败')
                }
              })
            } else {
              submitData.id = this.form.id
              updateTenant(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('修改租户成功')
                  this.resetForm()
                } else {
                  this.$message.error('修改租户失败')
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
