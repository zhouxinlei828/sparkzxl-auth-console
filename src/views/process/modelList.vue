<template>
  <div class="filter-container" style="padding-bottom: 0">
    <el-form :inline="true" :model="queryParam" size="small">
      <el-form-item label="流程名称:">
        <el-input v-model="queryParam.name" placeholder="请输入流程流程名称" />
      </el-form-item>
      <el-form-item label="流程KEY:">
        <el-input v-model="queryParam.key" placeholder="请输入流程KEY" />
      </el-form-item>
      <el-form-item>
        <el-button
          style="margin-left: 12px"
          icon="search"
          type="primary"
          @click="getModelList"
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
                key: '',
              })
          "
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">流程列表</el-divider>
    <div class="filter-container">
      <el-button
        size="small"
        class="filter-item"
        icon="el-icon-plus"
        type="primary"
        @click="handleAdd"
      >
        新建
      </el-button>
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
      <el-table-column prop="name" label="流程名称"></el-table-column>
      <el-table-column prop="key" label="流程key" width="180"></el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        width="210"
      ></el-table-column>
      <el-table-column
        prop="deployed"
        label="状态"
        width="80"
      ></el-table-column>
      <el-table-column prop="version" label="版本"></el-table-column>
      <el-table-column label="操作" align="center" width="250">
        <template #default="{ row }">
          <el-link type="primary">
            <IconFont type="icon-edit" @click="handleEdit(row.id)" />
          </el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link type="primary">
            <IconFont
              type="icon-template_delete"
              @click="handleDelete(row.id)"
            />
          </el-link>
          <el-divider direction="vertical" />
          <el-link type="primary">
            <el-button type="text" @click="handleSetRule(row.id)">
              流程规则
            </el-button>
          </el-link>
          <el-divider direction="vertical" />
          <el-link type="primary">
            <el-button type="text" @click="handlePublishProcess(row.id)">
              发布流程
            </el-button>
          </el-link>
          <el-divider direction="vertical" />
          <el-link type="primary">
            <el-button type="text" @click="revokePublish(row.id)">
              撤销
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
    <edit-flow-chart-form ref="flowChartForm" @fetch-data="getModelList" />
    <create-model-form ref="createModelForm" @fetch-data="getModelList" />
    <create-rule-form ref="createRuleForm" @fetch-data="getModelList" />
  </div>
</template>

<script>
  import moment from 'moment'
  import {
    getModelList,
    deleteModel,
    publishProcess,
    revokePublish,
  } from '@/api/model'
  import EditFlowChartForm from './modules/EditFlowChartForm'
  import CreateModelForm from './modules/CreateModelForm'
  import CreateRuleForm from './modules/CreateRuleForm'
  import { deleteApplication } from '@/api/client'

  export default {
    name: 'TableList',
    components: {
      EditFlowChartForm,
      CreateModelForm,
      CreateRuleForm,
    },
    data() {
      return {
        // 查询参数
        queryParam: {
          pageNum: 1,
          pageSize: 10,
          name: '',
          key: '',
        },
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        modelData: [],
        selectedRows: [],
        tableLoading: false,
      }
    },
    created() {
      this.getModelList()
    },
    methods: {
      handleSelectionChange(val) {
        this.selectedRows = val
      },
      handleSizeChange(val) {
        this.queryParam.pageSize = val
        this.getModelList()
      },
      handleCurrentChange(val) {
        this.queryParam.pageNum = val
        this.getModelList()
      },
      getModelList() {
        this.tableLoading = true
        getModelList(this.queryParam).then((response) => {
          const responseData = response.data
          this.total = parseInt(responseData.total)
          this.modelData = responseData.list
          this.tableLoading = false
        })
      },
      handleAdd() {
        this.$refs['createModelForm'].showDialog()
      },
      handleEdit(id) {
        const data = {
          flowChartSrc: process.env.VUE_APP_ACT_BASE_URL.concat(id),
        }
        this.$refs['flowChartForm'].showDialog(data)
      },
      revokePublish(id) {
        revokePublish({ modelId: id }).then((response) => {
          const responseData = response.data
          if (responseData) {
            this.$message.success('撤销流程成功')
            this.$refs.table.refresh()
          } else {
            this.$message.error('撤销流程失败')
          }
        })
      },
      handlePublishProcess(id) {
        publishProcess({ modelId: id }).then((response) => {
          const responseData = response.data
          if (responseData) {
            this.$message.success('发布流程成功')
            this.$refs.table.refresh()
          } else {
            this.$message.error('发布流程失败')
          }
        })
      },
      handleSetRule(id) {
        const data = { id: id }
        this.$refs['createRuleForm'].showDialog(data)
      },
      handleDelete(id) {
        deleteModel({ ids: [id] }).then((response) => {
          const responseData = response.data
          if (responseData) {
            this.$message.success('删除流程成功')
            this.getModelList()
          } else {
            this.$message.error('删除流程失败')
          }
        })
      },
      handleBatchDelete() {
        if (this.selectedRows.length > 0) {
          const ids = []
          this.selectedRows.map((item) => ids.push(item.id))
          this.$baseConfirm('你确定要删除选中项吗', null, async () => {
            const parameter = {
              ids: ids,
            }
            deleteModel(parameter).then((response) => {
              const responseData = response.data
              if (responseData) {
                this.$message.success('删除流程成功')
                this.getModelList()
              } else {
                this.$message.error('删除流程失败')
              }
            })
          })
        } else {
          this.$message.error('未选中任何行')
        }
      },
    },
  }
</script>
