<template>
  <el-card>
    <el-row :gutter="20" class="workflow-process">
      <el-col :span="3">
        <div style="text-align: right">处理环节:</div>
      </el-col>
      <el-col :span="19">
        <div>
          {{ data.taskName }}
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="workflow-process">
      <el-col :span="3">
        <div style="text-align: right">处理状态:</div>
      </el-col>
      <el-col :span="19">
        <el-tag
          :type="data.taskStatus === 3 ? 'success' : 'primary'"
          disable-transitions
        >
          {{ data.taskStatusName }}
        </el-tag>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="workflow-process">
      <el-col :span="3">
        <div style="text-align: right">处理人员:</div>
      </el-col>
      <el-col :span="19">
        <div>
          {{ data.assigneeName }}
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="workflow-process">
      <el-col :span="3">
        <div style="text-align: right">处理时间:</div>
      </el-col>
      <el-col :span="19">
        <div>
          {{ data.endTime }}
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="workflow-process">
      <el-col :span="3">
        <div style="text-align: right">处理意见:</div>
      </el-col>
      <el-col :span="19">
        <div class="process-comment">
          {{ data.comment }}
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>
<style>
  .workflow-process {
    line-height: 30px;
  }
  .process-comment {
    color: #0bbd87;
  }
</style>
<script>
  export default {
    name: 'ProcessHistoryForm',
    props: {
      // eslint-disable-next-line vue/require-prop-types
      data: {
        Object,
        default: () => {
          return {
            assignee: null,
            assigneeName: null,
            candidate: null,
            comment: null,
            dueDate: null,
            duration: null,
            durationTime: null,
            endTime: null,
            processInstanceId: null,
            startTime: null,
            taskName: null,
            taskStatus: null,
            taskStatusName: null,
          }
        },
      },
    },
  }
</script>
