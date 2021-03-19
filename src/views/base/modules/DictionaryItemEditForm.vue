<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="closeDialog"
  >
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="编码:" prop="code" style="margin-top: 30px" required>
        <el-tooltip
          class="item"
          effect="dark"
          content="建议使用大写，如：NATION"
          placement="top"
        >
          <el-input v-model="form.code" style="width: 80%" />
        </el-tooltip>
      </el-form-item>
      <el-form-item label="名称:" prop="name" required>
        <el-input v-model="form.name" style="width: 80%" />
      </el-form-item>
      <el-form-item label="状态:" prop="isEnable" required>
        <el-radio v-model="form.isEnable" label="1">启用</el-radio>
        <el-radio v-model="form.isEnable" label="2">禁用</el-radio>
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
  import { saveDictionaryItem, updateDictionaryItem } from '@/api/dictionary'

  export default {
    data() {
      return {
        title: '新建字典项',
        dialogFormVisible: false,
        form: {
          id: null,
          code: null,
          dictionaryId: null,
          dictionaryType: null,
          name: null,
          isEnable: '1',
          describe: null,
        },
        rules: {
          code: [{ required: true, message: '编码不能为空', trigger: 'blur' }],
          name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        },
      }
    },
    methods: {
      showDialog(data) {
        this.form.id = data.id === undefined ? null : data.id
        this.title =
          data.id === undefined
            ? '新建字典项（'.concat(data.activeDictionary).concat('）')
            : '修改字典项（'.concat(data.activeDictionary).concat('）')
        this.form.code = data.code
        this.form.dictionaryId = data.dictionaryId
        this.form.dictionaryType = data.dictionaryType
        this.form.name = data.name
        this.form.isEnable = data.isEnable
        this.form.describe = data.describe
        this.dialogFormVisible = true
      },
      onSubmit() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            const submitData = this.form
            if (submitData.id !== null) {
              updateDictionaryItem(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('修改字典项成功')
                  this.resetForm()
                } else {
                  this.$message.error('修改字典项失败')
                }
              })
            } else {
              saveDictionaryItem(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('新增字典项成功')
                  this.resetForm()
                } else {
                  this.$message.error('新增字典项失败')
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
        this.title = '新建字典项'
        this.dialogFormVisible = false
      },
      closeDialog() {
        this.$refs['ruleForm'].resetFields()
        this.title = '新建字典项'
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
    },
  }
</script>
