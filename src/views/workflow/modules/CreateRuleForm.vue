<template>
  <el-dialog
    title="设置流程跳转规则"
    :visible.sync="dialogFormVisible"
    width="900px"
    @close="closeDialog"
  >
    <el-form
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-position="labelPosition"
      :inline="true"
      size="small"
      label-width="100px"
    >
      <el-form-item label="开始节点:" prop="processDetailId">
        <el-select
          v-model="form.processDetailId"
          placeholder="请选择开始节点"
          class="edit-form-item"
          @change="handleChange"
        >
          <el-option
            v-for="item in processDetailList"
            :key="item.id"
            :label="item.taskName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="动作类型:" prop="actType">
        <el-select
          v-model="form.actType"
          placeholder="动作类型"
          style="width: 100px"
        >
          <el-option
            v-for="item in processAction"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="目标节点:" prop="targetProcessDetailId">
        <el-select
          v-model="form.targetProcessDetailId"
          placeholder="请选择开始节点"
          class="edit-form-item"
        >
          <el-option
            v-for="item in processDetailList"
            :key="item.id"
            :label="item.taskName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-button size="small" type="primary" @click="handleSubmit">
        保存规则
      </el-button>
    </el-form>
    <el-divider>流程规则列表</el-divider>
    <el-table :data="tableData" border style="width: 100%" max-height="250">
      <el-table-column prop="processName" label="流程名称"></el-table-column>
      <el-table-column
        prop="sourceTaskDefKey"
        label="开始节点"
      ></el-table-column>
      <el-table-column
        prop="sourceTaskName"
        label="开始节点名称"
      ></el-table-column>
      <el-table-column
        prop="targetTaskDefKey"
        label="目标节点"
      ></el-table-column>
      <el-table-column
        prop="targetTaskName"
        label="目标节点名称"
      ></el-table-column>
      <el-table-column prop="action" label="动作类型" width="80">
        <template #default="{ row }">
          <el-tag
            :type="row.action.id === -1 ? 'danger' : 'primary'"
            disable-transitions
          >
            {{ row.action.name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <IconFont
            type="icon-template_delete"
            @click="deleteProcessTaskRule(row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button
        size="small"
        class="button-item"
        type="primary"
        @click="resetDialog"
      >
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
  import {
    getProcessDetailList,
    getProcessAction,
    saveProcessTaskRule,
    getProcessTaskRule,
    deleteProcessTaskRule,
  } from '@/api/model'

  export default {
    data() {
      return {
        dialogFormVisible: false,
        labelPosition: 'right',
        rules: {
          processDetailId: [
            { required: true, message: '开始节点不能为空', trigger: 'blur' },
          ],
          actType: [
            { required: true, message: '动作类型不能为空', trigger: 'blur' },
          ],
          targetProcessDetailId: [
            { required: true, message: '目标节点不能为空', trigger: 'blur' },
          ],
        },
        form: {
          processDetailId: null,
          actType: null,
          targetProcessDetailId: null,
        },
        processDetailList: [],
        processAction: [],
        processDefinitionKey: '',
        taskDefKey: '',
        id: null,
        tableData: [],
      }
    },
    methods: {
      showDialog(data) {
        this.dialogFormVisible = true
        this.getProcessDetailList(data.id)
        this.getProcessAction()
      },
      getProcessDetailList(modelId) {
        const requestData = {
          modelId: modelId,
        }
        getProcessDetailList(requestData).then((response) => {
          this.processDetailList = response.data
        })
      },
      loadData() {
        const requestData = {
          procDefKey: this.processDefinitionKey,
          taskDefKey: this.taskDefKey,
        }
        return getProcessTaskRule(requestData).then((response) => {
          const responseData = response.data
          for (const data of responseData) {
            data.key = data.id
            for (const action of this.processAction) {
              if (action.id === data.actType) {
                data.action = action
                break
              }
            }
          }
          this.tableData = responseData
        })
      },
      getProcessAction() {
        getProcessAction().then((response) => {
          this.processAction = response.data
        })
      },
      handleChange(value) {
        this.value = value
        for (const processDetail of this.processDetailList) {
          if (processDetail.id === value) {
            this.taskDefKey = processDetail.taskDefKey
            this.processDefinitionKey = processDetail.processDefinitionKey
            break
          }
        }
        this.loadData()
      },
      handleSubmit() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let taskDefKey = ''
            let taskName = ''
            for (const processDetail of this.processDetailList) {
              if (processDetail.id === this.form.targetProcessDetailId) {
                taskDefKey = processDetail.taskDefKey
                taskName = processDetail.taskName
                break
              }
            }
            const data = {
              processDetailId: this.form.processDetailId,
              actType: this.form.actType,
              taskDefKey: taskDefKey,
              taskName: taskName,
            }
            saveProcessTaskRule(data).then((response) => {
              const responseData = response.data
              if (responseData) {
                this.$message.success('设置流程规则成功')
                this.loadData()
              } else {
                this.$message.error('设置流程规则失败')
              }
            })
          }
        })
      },
      deleteProcessTaskRule(id) {
        const requestData = {
          id: id,
        }
        deleteProcessTaskRule(requestData).then((response) => {
          const responseData = response.data
          if (responseData) {
            this.$message.success('删除流程规则成功')
            this.loadData()
          } else {
            this.$message.error('删除流程规则失败')
          }
        })
      },
      closeDialog() {
        this.processDetailList = []
        this.processAction = []
        this.tableData = []
        this.processDefinitionKey = ''
        this.taskDefKey = ''
        this.$refs['ruleForm'].resetFields()
        this.dialogFormVisible = false
      },
      resetDialog() {
        this.processDetailList = []
        this.processAction = []
        this.tableData = []
        this.processDefinitionKey = ''
        this.taskDefKey = ''
        this.$refs['ruleForm'].resetFields()
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
    },
  }
</script>
