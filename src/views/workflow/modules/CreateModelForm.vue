<template>
  <el-dialog
    title="新建流程"
    :visible.sync="dialogFormVisible"
    width="480px"
    @close="closeDialog"
  >
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="流程key:" prop="key">
        <el-input v-model="form.key" style="width: 300px" />
      </el-form-item>
      <el-form-item label="流程名称:" prop="name">
        <el-input v-model="form.name" style="width: 300px" />
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
        @click="handleSave"
      >
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { createModel } from '@/api/model'

  export default {
    data() {
      return {
        dialogFormVisible: false,
        form: {
          name: '',
          key: '',
        },
        rules: {
          name: [
            {
              required: true,
              message: '请输入至少三个字符的流程名称',
              trigger: 'blur',
            },
          ],
          key: [
            {
              required: true,
              message: '请输入至少五个字符的流程key',
              trigger: 'blur',
            },
          ],
        },
      }
    },
    methods: {
      showDialog() {
        this.dialogFormVisible = true
      },
      handleSave() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            // 新增
            createModel(this.form).then((response) => {
              const responseData = response.data
              if (responseData !== null) {
                this.$message.success('新增流程成功')
                this.resetForm()
              } else {
                this.$message.error('新增流程失败')
              }
            })
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
