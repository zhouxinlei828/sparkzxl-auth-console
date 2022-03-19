<template>
  <div class="filter-container" style="padding-bottom: 0">
    <el-input
      v-model="queryParam.account"
      size="small"
      class="filter-item search-item"
      placeholder="账号"
    />
    <el-date-picker
      v-model="queryParam.startTime"
      type="date"
      class="filter-item button-item"
      value-format="yyyy-MM-dd HH:mm:ss"
      format="yyyy-MM-dd HH:mm:ss"
      placeholder="选择开始日期"
    ></el-date-picker>
    <el-date-picker
      v-model="queryParam.endTime"
      type="date"
      class="filter-item button-item"
      value-format="yyyy-MM-dd HH:mm:ss"
      format="yyyy-MM-dd HH:mm:ss"
      placeholder="选择结束日期"
    ></el-date-picker>
    <el-button
      size="small"
      class="filter-item button-item"
      icon="search"
      type="primary"
      @click="getLoginLogPage()"
    >
      查询
    </el-button>
    <el-button
      size="small"
      class="filter-item button-item"
      @click="initQueryParam"
    >
      重置
    </el-button>
    <el-divider content-position="left">登录日志列表</el-divider>
    <el-table
      v-loading="tableLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="stationData"
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
      <el-table-column prop="account" label="账号"></el-table-column>
      <el-table-column prop="userName" label="姓名"></el-table-column>
      <el-table-column prop="requestIp" label="登录ip"></el-table-column>
      <el-table-column prop="browser" label="浏览器"></el-table-column>
      <el-table-column
        prop="operatingSystem"
        label="操作系统"
      ></el-table-column>
      <el-table-column prop="location" label="登录地点"></el-table-column>
      <el-table-column prop="description" label="事件描述"></el-table-column>
      <el-table-column
        prop="loginDate"
        label="登录时间"
        width="180"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-link type="primary">
            <IconFont
              type="icon-template_delete"
              @click="handleDelete(row.id)"
            />
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
  </div>
</template>

<script>
  import moment from 'moment'
  import { deleteStation } from '@/api/station'
  import { deleteLoginLog, loginLogPage } from '@/api/login'

  export default {
    data() {
      return {
        total: 0,
        // 查询参数
        queryParam: {
          pageNum: 1,
          pageSize: 10,
          account: null,
          startTime: null,
          endTime: null,
        },
        layout: 'total, sizes, prev, pager, next, jumper',
        orgData: [],
        stationData: [],
        tableLoading: false,
        selectedRowKeys: [],
        selectedRows: [],
      }
    },
    mounted() {
      this.getLoginLogPage()
    },
    methods: {
      initQueryParam() {
        this.queryParam = {
          pageNum: 1,
          pageSize: 10,
          account: null,
          startTime: null,
          endTime: null,
        }
      },
      handleSizeChange(val) {
        this.queryParam.pageSize = val
        this.getLoginLogPage()
      },
      handleCurrentChange(val) {
        this.queryParam.pageNum = val
        this.getLoginLogPage()
      },
      async getLoginLogPage() {
        this.tableLoading = true
        const params = {
          pageNum: this.queryParam.pageNum,
          pageSize: this.queryParam.pageSize,
          model: {
            account: this.queryParam.account,
            startTime: this.queryParam.startTime,
            endTime: this.queryParam.endTime,
          },
        }
        loginLogPage(params).then((response) => {
          const result = response.data
          this.total = parseInt(result.total)
          this.stationData = result.records
          for (const station of this.stationData) {
            station.loginDate = moment(station.loginDate).format(
              'YYYY-MM-DD HH:mm:ss'
            )
          }
          this.tableLoading = false
        })
      },
      loadListOptions({ callback }) {
        callback()
      },
      handleDelete(id) {
        deleteLoginLog({ ids: [id] }).then((response) => {
          const responseData = response.data
          if (responseData) {
            this.$message.success('删除登录日志成功')
            this.getLoginLogPage()
          } else {
            this.$message.error('删除登录日志失败')
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
            deleteLoginLog(parameter).then((response) => {
              const responseData = response.data
              if (responseData) {
                this.$message.success('删除岗位成功')
                this.getLoginLogPage()
              } else {
                this.$message.error('删除岗位失败')
              }
            })
          })
        } else {
          this.$message.error('未选中任何行')
        }
      },
      handleSelectionChange(val) {
        this.selectedRows = val
      },
    },
  }
</script>
