<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="450px"
    @close="closeDialog"
  >
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="70px">
      <el-form-item label="名称:" prop="name" required>
        <el-input v-model="form.name" style="width: 300px" />
      </el-form-item>
      <el-form-item label="组织:" prop="org">
        <TreeSelect
          v-model="form.org"
          style="width: 300px"
          :load-options="loadListOptions"
          :multiple="false"
          :searchable="true"
          placeholder="选择组织"
          :options="orgData"
        />
      </el-form-item>
      <el-form-item label="状态:" prop="status">
        <el-radio v-model="form.status" label="1">启用</el-radio>
        <el-radio v-model="form.status" label="2">禁用</el-radio>
      </el-form-item>
      <el-form-item label="描述:" prop="describe">
        <el-input
          v-model="form.describe"
          type="textarea"
          style="width: 300px"
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
  import { updateStation, saveStation } from '@/api/station'

  export default {
    data() {
      return {
        title: '',
        dialogFormVisible: false,
        form: {
          name: null,
          org: null,
          status: '1',
          describe: null,
        },
        rules: {
          name: [
            { required: true, message: '岗位名称不能为空', trigger: 'blur' },
          ],
          status: [
            { required: true, message: '状态不能为空', trigger: 'blur' },
          ],
        },
        status: 1,
        orgData: [],
      }
    },
    created() {},
    methods: {
      showDialog(data) {
        if (data.id !== undefined) {
          this.title = '修改岗位'
        } else {
          this.title = '新增岗位'
        }
        this.orgData = data.orgData
        delete data.orgData
        this.dialogFormVisible = true
        this.form = data
      },
      onChange(e) {
        console.log('radio checked', e.target.value)
      },
      loadListOptions({ callback }) {
        callback()
      },
      onSubmit() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            const status = parseInt(this.form.status) === 1
            const submitData = this.form
            submitData.org =
              this.form.org === null
                ? null
                : {
                    key: this.form.org,
                  }
            submitData.status = status
            if (this.form.id === undefined) {
              saveStation(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('新增岗位成功')
                  this.resetForm()
                } else {
                  this.$message.error('新增岗位失败')
                }
              })
            } else {
              submitData.id = this.form.id
              updateStation(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('修改岗位成功')
                  this.resetForm()
                } else {
                  this.$message.error('修改岗位失败')
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
