<template>
  <el-dialog
    title="查看流程实例信息"
    :visible.sync="dialogFormVisible"
    width="950px"
    @close="closeDialog"
  >
    <el-form
      ref="ruleForm"
      :model="form"
      :inline="true"
      size="small"
      label-width="100px"
    >
      <el-divider content-position="left">流程实例基本信息</el-divider>
      <el-row>
        <el-col span="8">
          <el-form-item label="流程定义key:" prop="processKey">
            <el-tag type="success" disable-transitions>
              {{ form.processKey }}
            </el-tag>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="流程名称:" prop="processName">
            <el-tag type="success" disable-transitions>
              {{ form.processName }}
            </el-tag>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="流程运行状态:" prop="status">
            <el-tag type="success" disable-transitions>
              {{ form.status }}
            </el-tag>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="8">
          <el-form-item label="是否挂起:" prop="suspensionState">
            <el-tag
              :type="form.suspensionState.id === 2 ? 'danger' : 'primary'"
              disable-transitions
            >
              {{ form.suspensionState.name }}
            </el-tag>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="开始时间:" prop="suspensionState">
            <el-tag type="success" disable-transitions>
              {{ form.startTime }}
            </el-tag>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="完成时间:" prop="finishTime">
            <el-tag type="success" disable-transitions>
              {{ form.finishTime }}
            </el-tag>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="8">
          <el-form-item label="发起人:" prop="originator">
            <el-tag type="success" disable-transitions>
              {{ form.originator }}
            </el-tag>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="流程耗时:" prop="originator">
            <el-tag type="success" disable-transitions>
              {{ form.dueTime }}
            </el-tag>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider content-position="left">流程任务历史</el-divider>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="taskName" label="任务名称"></el-table-column>
      <el-table-column prop="startTime" label="开始时间"></el-table-column>
      <el-table-column prop="endTime" label="处理时间"></el-table-column>
      <el-table-column
        prop="durationTime"
        label="耗时"
        width="80"
      ></el-table-column>
      <el-table-column prop="candidate" label="候选人"></el-table-column>
      <el-table-column prop="assignee" label="处理人"></el-table-column>
      <el-table-column prop="dueDate" label="到期时间"></el-table-column>
      <el-table-column prop="taskStatus" label="任务状态">
        <template #default="{ row }">
          <el-tag
            :type="row.taskStatus === '待处理' ? 'success' : 'primary'"
            disable-transitions
          >
            {{ row.taskStatus }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="comment" label="备注/意见"></el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button
        size="small"
        class="button-item"
        type="primary"
        @click="closeDialog"
      >
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>
<style>
  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
<script>
  import { historyList } from '@/api/instance'
  import moment from 'moment'

  export default {
    data() {
      return {
        dialogFormVisible: false,
        form: {
          processInstanceId: null,
          processKey: null,
          processName: null,
          status: null,
          suspensionState: {
            id: null,
            name: null,
          },
          startTime: null,
          finishTime: null,
          originator: null,
          dueTime: null,
        },
        tableData: [],
      }
    },
    methods: {
      showDialog(data) {
        this.form = data
        this.dialogFormVisible = true
        this.loadData(data.processInstanceId)
      },
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex === this.tableData.length - 1) {
          return 'success-row'
        }
        return ''
      },
      loadData(processInstanceId) {
        return historyList({
          processInstanceId: processInstanceId,
          type: 2,
        }).then((response) => {
          this.tableData = response.data
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].number = i
            if (this.tableData[i].startTime !== null) {
              this.tableData[i].startTime = moment(
                this.tableData[i].startTime
              ).format('YYYY-MM-DD HH:mm:ss')
            }
            if (this.tableData[i].endTime !== null) {
              this.tableData[i].endTime = moment(
                this.tableData[i].endTime
              ).format('YYYY-MM-DD HH:mm:ss')
            }
            if (this.tableData[i].dueDate !== null) {
              this.tableData[i].dueDate = moment(
                this.tableData[i].dueDate
              ).format('YYYY-MM-DD HH:mm:ss')
            }
          }
        })
      },
      closeDialog() {
        this.tableData = []
        this.dialogFormVisible = false
      },
    },
  }
</script>
