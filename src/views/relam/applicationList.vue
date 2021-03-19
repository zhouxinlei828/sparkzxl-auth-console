<template>
  <div class="filter-container" style="padding-bottom: 0">
    <el-input
      v-model="queryParam.appName"
      size="small"
      class="filter-item search-item"
      placeholder="应用名称"
    />
    <el-input
      v-model="queryParam.clientId"
      size="small"
      class="filter-item search-item"
      placeholder="客户端id"
    />
    <el-button
      size="small"
      class="filter-item button-item"
      icon="search"
      type="primary"
      @click="getApplicationPageList"
    >
      查询
    </el-button>
    <el-button
      size="small"
      class="filter-item button-item"
      @click="
        () =>
          (this.queryParam = {
            pageNum: 1,
            pageSize: 10,
            clientId: null,
            appName: null,
          })
      "
    >
      重置
    </el-button>
    <el-divider content-position="left">应用列表</el-divider>
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
      <el-table-column
        prop="tenantName"
        label="租户"
        width="100"
      ></el-table-column>
      <el-table-column prop="name" label="应用"></el-table-column>
      <el-table-column prop="appTypeName" label="应用类型"></el-table-column>
      <el-table-column prop="icon" label="应用logo"></el-table-column>
      <el-table-column prop="website" label="应用访问地址"></el-table-column>
      <el-table-column prop="healthStatus" label="应用健康状态">
        <template #default="{ row }">
          <el-tag
            v-if="row.healthCheck !== null"
            :type="row.healthStatus === true ? 'success' : 'danger'"
            disable-transitions
          >
            {{ row.healthStatus === true ? '健康' : '下线' }}
          </el-tag>
          <el-tag v-else type="warning" disable-transitions>未注册</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="clientId" label="客户端"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-link type="primary">
            <IconFont type="icon-edit" @click="handleEdit(row)" />
          </el-link>
          <el-divider direction="vertical"></el-divider>
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
    <application-edit-form
      ref="editForm"
      @fetch-data="getApplicationPageList"
    />
  </div>
</template>

<script>
  import moment from 'moment'
  import ApplicationEditForm from './modules/ApplicationEditForm'
  import { getApplicationPageList, deleteApplication } from '@/api/client'

  export default {
    components: {
      ApplicationEditForm,
    },
    data() {
      return {
        total: 0,
        // 查询参数
        queryParam: {
          pageNum: 1,
          pageSize: 10,
          clientId: null,
          appName: null,
        },
        layout: 'total, sizes, prev, pager, next, jumper',
        orgData: [],
        stationData: [],
        tableLoading: false,
        selectedRows: [],
      }
    },
    mounted() {
      this.getApplicationPageList()
    },
    methods: {
      handleSelectionChange(val) {
        this.selectedRows = val
      },
      handleSizeChange(val) {
        this.queryParam.pageSize = val
        this.getApplicationPageList()
      },
      handleCurrentChange(val) {
        this.queryParam.pageNum = val
        this.getApplicationPageList()
      },
      getApplicationPageList() {
        this.tableLoading = true
        const queryModel = {
          pageNum: this.queryParam.pageNum,
          pageSize: this.queryParam.pageSize,
          model: {
            clientId: this.queryParam.clientId,
            appName: this.queryParam.appName,
          },
        }
        getApplicationPageList(queryModel).then((response) => {
          const result = response.data
          this.total = parseInt(result.total)
          this.stationData = result.list
          for (const station of this.stationData) {
            station.createTime = moment(station.createTime).format(
              'YYYY-MM-DD HH:mm:ss'
            )
            if (station.expirationTime !== null) {
              station.expirationTime = moment(station.expirationTime).format(
                'YYYY-MM-DD HH:mm:ss'
              )
            }
          }
          this.tableLoading = false
        })
      },
      loadListOptions({ callback }) {
        callback()
      },
      handleAdd() {
        const createData = {
          id: null,
          name: null,
          website: null,
          icon: null,
          appType: null,
          healthCheck: null,
          describe: null,
          clientId: null,
          clientSecret: null,
          authorizedGrantTypes: [],
          authorities: null,
          resourceIds: null,
          scope: null,
          accessTokenValidity: 7200,
          refreshTokenValidity: 864000,
          webServerRedirectUri: null,
          autoApprove: 'true',
          additionalInformation: null,
        }
        this.$refs['editForm'].showDialog(createData)
      },
      handleEdit(record) {
        let authorizedGrantTypes = []
        let oauthClientDetail = record.oauthClientDetail
        if (oauthClientDetail !== null) {
          authorizedGrantTypes = oauthClientDetail.authorizedGrantTypes.split(
            ','
          )
        } else {
          oauthClientDetail = {
            clientId: null,
            clientSecret: null,
            authorizedGrantTypes: [],
            authorities: null,
            resourceIds: null,
            scope: null,
            accessTokenValidity: 7200,
            refreshTokenValidity: 864000,
            webServerRedirectUri: null,
            autoApprove: 'true',
            additionalInformation: null,
          }
        }
        const data = {
          id: record.id,
          name: record.name,
          website: record.website,
          icon: record.icon,
          appType: record.appType,
          healthCheck: record.healthCheck,
          describe: record.describe,
          clientId: oauthClientDetail.clientId,
          clientSecret: record.originalClientSecret,
          authorizedGrantTypes: authorizedGrantTypes,
          authorities: oauthClientDetail.authorities,
          resourceIds: oauthClientDetail.resourceIds,
          scope: oauthClientDetail.scope,
          accessTokenValidity: oauthClientDetail.accessTokenValidity,
          refreshTokenValidity: oauthClientDetail.refreshTokenValidity,
          webServerRedirectUri: oauthClientDetail.webServerRedirectUri,
          autoApprove: oauthClientDetail.autoApprove,
          additionalInformation: oauthClientDetail.additionalInformation,
        }
        this.$refs['editForm'].showDialog(data)
      },
      buildTreeData(data) {
        const jsonArray = []
        for (const datum of data) {
          const children = datum.children
          let treeNode = null
          if (children !== null && children.length > 0) {
            treeNode = this.buildTreeData(children)
          }
          const jsonData = {
            value: datum.id,
            label: datum.label,
            children: treeNode,
          }
          jsonArray.push(jsonData)
        }
        return jsonArray
      },
      handleDelete(id) {
        deleteApplication({ ids: [id] }).then((response) => {
          const responseData = response.data
          if (responseData) {
            this.$message.success('删除应用成功')
            this.getApplicationPageList()
          } else {
            this.$message.error('删除应用失败')
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
            deleteApplication(parameter).then((response) => {
              const responseData = response.data
              if (responseData) {
                this.$message.success('删除应用成功')
                this.getApplicationPageList()
              } else {
                this.$message.error('删除应用失败')
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
