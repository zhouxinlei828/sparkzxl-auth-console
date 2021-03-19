<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="closeDialog"
  >
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="类型:" prop="type" style="margin-top: 30px" required>
        <el-tooltip
          class="item"
          effect="dark"
          content="建议使用大写，如：NATION"
          placement="top"
        >
          <el-input v-model="form.type" style="width: 80%" />
        </el-tooltip>
      </el-form-item>
      <el-form-item label="名称:" prop="name" required>
        <el-input v-model="form.name" style="width: 80%" />
      </el-form-item>
      <el-form-item label="描述:" prop="describe">
        <el-input v-model="form.describe" type="textarea" style="width: 80%" />
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
  import { saveDictionary, updateDictionary } from '@/api/dictionary'

  export default {
    data() {
      return {
        title: '新建字典',
        dialogFormVisible: false,
        form: {
          id: null,
          type: null,
          name: null,
          describe: null,
        },
        rules: {
          type: [{ required: true, message: '类型不能为空', trigger: 'blur' }],
          name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        },
      }
    },
    methods: {
      showDialog(data) {
        this.form.id = data.id === undefined ? null : data.id
        this.title = data.id === undefined ? this.title : '修改字典'
        this.form.type = data.type
        this.form.name = data.name
        this.form.describe = data.describe
        this.dialogFormVisible = true
      },
      onSubmit() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            const submitData = this.form
            if (submitData.id !== null) {
              updateDictionary(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('修改字典成功')
                  this.resetForm()
                } else {
                  this.$message.error('修改字典失败')
                }
              })
            } else {
              saveDictionary(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('新增字典成功')
                  this.resetForm()
                } else {
                  this.$message.error('新增字典失败')
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
        this.title = '新建字典'
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      closeDialog() {
        this.$refs['ruleForm'].resetFields()
        this.title = '新建字典'
        this.dialogFormVisible = false
      },
    },
  }
</script>
