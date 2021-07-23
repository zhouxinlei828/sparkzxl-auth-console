<template>
  <el-dialog
    title="查看流程实例信息"
    :visible.sync="dialogFormVisible"
    width="950px"
    @close="closeDialog"
  >
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="申请信息" name="processApply">
        <el-form
          ref="ruleForm"
          :model="form"
          :inline="true"
          size="small"
          label-width="100px"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="流程定义key:" prop="processKey">
                <el-tag type="success" disable-transitions>
                  {{ form.processKey }}
                </el-tag>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="流程名称:" prop="processName">
                <el-tag type="success" disable-transitions>
                  {{ form.processName }}
                </el-tag>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="流程运行状态:" prop="status">
                <el-tag
                  :type="form.suspensionState.id === 2 ? 'danger' : 'primary'"
                  disable-transitions
                >
                  {{ form.status }}
                </el-tag>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="开始时间:" prop="suspensionState">
                <el-tag type="success" disable-transitions>
                  {{ form.startTime }}
                </el-tag>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="完成时间:" prop="finishTime">
                <el-tag
                  v-show="form.finishTime"
                  type="success"
                  disable-transitions
                >
                  {{ form.finishTime }}
                </el-tag>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发起人:" prop="originatorName">
                <el-tag type="success" disable-transitions>
                  {{ form.originatorName }}
                </el-tag>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="流程耗时:" prop="originator">
                <el-tag
                  v-show="form.dueTime"
                  type="success"
                  disable-transitions
                >
                  {{ form.dueTime }}
                </el-tag>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="流转信息" name="processHistory">
        <div class="block">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in processHistoryTimeline"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
              :timestamp="activity.startTime"
              placement="top"
            >
              <process-history-form :data="activity" />
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-tab-pane>
      <el-tab-pane label="流程跟踪" name="processImage">
        <img style="display: table-cell; margin: 0 auto" :src="flowChartSrc" />
      </el-tab-pane>
    </el-tabs>
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
<script>
  import { historyList, showFlowChart } from '@/api/instance'
  import moment from 'moment'
  import ProcessHistoryForm from './ProcessHistoryForm'

  export default {
    components: {
      ProcessHistoryForm,
    },
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
        flowChartSrc: '',
        tableData: [],
        processHistoryTimeline: [],
        activeName: 'processApply',
      }
    },
    methods: {
      showDialog(data) {
        this.form = data
        this.dialogFormVisible = true
        this.loadData(data.processInstanceId)
        this.handleShowFlowChart(data.processInstanceId)
      },
      handleShowFlowChart(processInstanceId) {
        const requestData = {
          processInstanceId: processInstanceId,
        }
        showFlowChart(requestData).then((response) => {
          this.flowChartSrc = response.data
        })
      },
      handleClick(tab, event) {
        console.log(tab, event)
      },
      loadData(processInstanceId) {
        return historyList({
          processInstanceId: processInstanceId,
          type: 2,
        }).then((response) => {
          const tableData = response.data
          for (const data of tableData) {
            data.size = 'large'
            data.type = 'primary'
            data.icon = 'el-icon-success'
            if (data.taskStatus === 3) {
              data.color = '#1890ff'
            } else if (data.taskStatus === -1) {
              data.color = '#ff4d4f'
            } else if (data.taskStatus === -2) {
              data.color = '#ff6700'
            } else {
              data.color = '#0bbd87'
            }
            if (data.startTime !== null) {
              data.startTime = moment(data.startTime).format(
                'YYYY-MM-DD HH:mm:ss'
              )
            }
            if (data.endTime !== null) {
              data.endTime = moment(data.endTime).format('YYYY-MM-DD HH:mm:ss')
            }
            this.processHistoryTimeline.push(data)
          }
          console.log(this.processHistoryTimeline)
        })
      },
      closeDialog() {
        this.tableData = []
        this.processHistoryTimeline = []
        this.dialogFormVisible = false
      },
    },
  }
</script>
