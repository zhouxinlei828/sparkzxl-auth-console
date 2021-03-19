<template>
  <div class="filter-container" style="padding-bottom: 0">
    <el-form :inline="true" :model="queryParam" size="small">
      <el-form-item label="流程名称:">
        <el-input v-model="queryParam.name" placeholder="请输入流程流程名称" />
      </el-form-item>
      <el-form-item>
        <el-button
          style="margin-left: 12px"
          icon="search"
          type="primary"
          @click="getProcessInstanceList"
        >
          查询
        </el-button>
        <el-button
          style="margin-left: 12px"
          @click="
            () =>
              (this.queryParam = {
                pageNum: 1,
                pageSize: 10,
                name: '',
              })
          "
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">流程实例列表</el-divider>
    <div class="filter-container">
      <el-button
        class="filter-item button-item"
        icon="el-icon-delete"
        type="danger"
        @click="handleBatchDelete"
      >
        批量删除
      </el-button>
    </div>
    <el-table
      v-loading="tableLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="modelData"
      border
      style="width: 100%"
      max-height="450"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        width="40"
      ></el-table-column>
      <el-table-column
        prop="processInstanceId"
        label="实例id"
      ></el-table-column>
      <el-table-column prop="businessKey" label="业务主键"></el-table-column>
      <el-table-column prop="processName" label="流程名称"></el-table-column>
      <el-table-column prop="processKey" label="流程key"></el-table-column>
      <el-table-column prop="status" label="流程状态"></el-table-column>
      <el-table-column
        prop="startTime"
        label="创建时间"
        width="160"
      ></el-table-column>
      <el-table-column prop="originator" label="发起人"></el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template #default="{ row }">
          <el-link type="primary">
            <el-button type="text" @click="getProcessHistory(row)">
              查看
            </el-button>
          </el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link type="primary">
            <el-button
              type="text"
              @click="handlerDeleteProcess(row.processInstanceId)"
            >
              删除
            </el-button>
          </el-link>
          <el-divider direction="vertical"></el-divider>
          <span v-show="row.status !== '结束' && row.suspensionState.id !== 2">
            <el-link type="primary">
              <el-button
                type="text"
                @click="handlerSuspendProcess(row.processInstanceId)"
              >
                挂起
              </el-button>
            </el-link>
            <el-divider direction="vertical" />
          </span>
          <el-link type="primary">
            <el-button
              type="text"
              @click="handleShowFlowChart(row.processInstanceId)"
            >
              流程图
            </el-button>
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="queryParam.pageNum"
      :page-size="queryParam.pageSize"
      :layout="layout"
      :total="total"
      :page-sizes="[5, 10, 20, 30]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <view-flow-chart-form ref="flowChartForm" />
    <process-history-form ref="processHistoryForm" />
  </div>
</template>

<script>
  import moment from 'moment'
  import {
    getProcessInstanceList,
    deleteProcessInstance,
    suspendProcess,
    showFlowChart,
  } from '@/api/instance'

  import ViewFlowChartForm from './modules/ViewFlowChartForm'
  import ProcessHistoryForm from './modules/ProcessHistoryForm'
  import { deleteModel } from '@/api/model'

  export default {
    components: {
      ViewFlowChartForm,
      ProcessHistoryForm,
    },
    data() {
      return {
        // 查询参数
        queryParam: {
          pageNum: 1,
          pageSize: 10,
          name: '',
        },
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        modelData: [],
        selectedRows: [],
        tableLoading: false,
      }
    },
    created() {
      this.getProcessInstanceList()
    },
    methods: {
      handleSelectionChange(val) {
        this.selectedRows = val
      },
      handleSizeChange(val) {
        this.queryParam.pageSize = val
        this.getProcessInstanceList()
      },
      handleCurrentChange(val) {
        this.queryParam.pageNum = val
        this.getProcessInstanceList()
      },
      getProcessInstanceList() {
        this.tableLoading = true
        getProcessInstanceList(this.queryParam).then((response) => {
          const responseData = response.data
          this.total = parseInt(responseData.total)
          const suspensionStateStop = {
            id: 2,
            name: '终止',
          }
          const suspensionState = {
            id: 1,
            name: '正常',
          }
          for (const data of responseData.list) {
            data.suspensionState =
              data.suspensionState === 1 ? suspensionState : suspensionStateStop
            if (data.startTime !== null) {
              data.startTime = moment(data.startTime).format(
                'YYYY-MM-DD HH:mm:ss'
              )
            }
            if (data.finishTime !== null) {
              data.finishTime = moment(data.finishTime).format(
                'YYYY-MM-DD HH:mm:ss'
              )
            }
          }
          this.modelData = responseData.list
          this.tableLoading = false
        })
      },
      handleShowFlowChart(processInstanceId) {
        const requestData = {
          processInstanceId: processInstanceId,
        }
        showFlowChart(requestData).then((response) => {
          this.$refs['flowChartForm'].showDialog(response.data)
        })
      },
      handlerSuspendProcess(processInstanceId) {
        const parameter = {
          processInstanceId: processInstanceId,
          type: 2,
        }
        suspendProcess(parameter).then((response) => {
          const responseData = response.data
          if (responseData) {
            this.$message.success('挂起流程实例成功')
            this.getProcessInstanceList()
          } else {
            this.$message.error('挂起流程实例失败')
          }
        })
      },
      handlerDeleteProcess(processInstanceId) {
        const requestData = {
          processInstanceIds: [processInstanceId],
          type: 2,
          deleteReason: '删除流程',
        }
        deleteProcessInstance(requestData).then((response) => {
          const responseData = response.data
          if (responseData) {
            this.$message.success('删除流程实例成功')
            this.getProcessInstanceList()
          } else {
            this.$message.error('删除流程实例失败')
          }
        })
      },
      handleBatchDelete() {
        if (this.selectedRows.length > 0) {
          const ids = []
          this.selectedRows.map((item) => ids.push(item.id))
          this.$baseConfirm('你确定要删除选中项吗', null, async () => {
            const requestData = {
              processInstanceIds: ids,
              type: 2,
              deleteReason: '删除流程',
            }
            deleteProcessInstance(requestData).then((response) => {
              const responseData = response.data
              if (responseData) {
                this.$message.success('删除流程实例成功')
                this.getProcessInstanceList()
              } else {
                this.$message.error('删除流程实例失败')
              }
            })
          })
        } else {
          this.$message.error('未选中任何行')
        }
      },
      getProcessHistory(row) {
        const formData = {
          processInstanceId: row.processInstanceId,
          processKey: row.processKey,
          processName: row.processName,
          status: row.status,
          suspensionState: row.suspensionState,
          startTime: row.startTime,
          finishTime: row.finishTime,
          originator: row.originator,
          dueTime: row.dueTime,
        }
        this.$refs['processHistoryForm'].showDialog(row)
      },
    },
  }
</script>
