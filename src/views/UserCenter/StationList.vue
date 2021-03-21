<template>
  <div class="filter-container" style="padding-bottom: 0">
    <el-input
      v-model="queryParam.name"
      size="small"
      class="filter-item search-item"
      placeholder="岗位名称"
    />
    <TreeSelect
      v-model="queryParam.orgId"
      class="filter-item search-item"
      size="small"
      :load-options="loadListOptions"
      :multiple="false"
      :searchable="true"
      placeholder="组织"
      :options="orgData"
    />
    <el-button
      size="small"
      class="filter-item button-item"
      icon="search"
      type="primary"
      @click="getStationList()"
    >
      查询
    </el-button>
    <el-button
      size="small"
      class="filter-item button-item"
      @click="() => (this.queryParam = {})"
    >
      重置
    </el-button>
    <el-divider content-position="left">岗位列表</el-divider>
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
      <el-link
        class="filter-item button-item"
        target="_blank"
        :href="excelTemplate"
        :underline="false"
      >
        <el-button size="small" icon="el-icon-download">
          下载EXCEL模板
        </el-button>
      </el-link>
      <el-upload
        ref="upload"
        class="filter-item button-item"
        :accept="uploadAccept"
        action=""
        :http-request="handleImportData"
        :limit="1"
        :show-file-list="false"
      >
        <el-button size="small">
          <IconFont type="icon-daoru" />
          <span style="margin-left: 5px">导入</span>
        </el-button>
      </el-upload>
      <el-button
        size="small"
        class="filter-item button-item"
        @click="handleExportExcelData"
      >
        <IconFont type="icon-daochu" />
        <span style="margin-left: 5px">导出</span>
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
      <el-table-column prop="name" label="岗位名称"></el-table-column>
      <el-table-column
        prop="describe"
        label="描述"
        width="180"
      ></el-table-column>
      <el-table-column prop="org" label="组织" width="210">
        <template #default="{ row }">
          <span v-if="row.org.data != null">
            {{ row.org.data.label }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80">
        <template #default="{ row }">
          <el-tag
            :type="row.status === true ? 'primary' : 'success'"
            disable-transitions
          >
            {{ row.status === true ? '启用' : '停用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180"
      ></el-table-column>
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
    <station-edit-form ref="editForm" @fetch-data="getStationList" />
  </div>
</template>

<script>
  import moment from 'moment'
  import { getOrgList } from '@/api/org'
  import {
    getStationPageList,
    deleteStation,
    importStationData,
    exportStationExcelData,
  } from '@/api/station'

  import StationEditForm from './modules/StationEditForm'
  import { downloadFile } from '@/utils/util'

  export default {
    components: {
      StationEditForm,
    },
    data() {
      return {
        uploadAccept: '.xls,.xlsx',
        excelTemplate: 'https://oss.sparksys.top/template/岗位导入模板.xlsx',
        total: 0,
        // 查询参数
        queryParam: {
          pageNum: 1,
          pageSize: 10,
          name: '',
          orgId: null,
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
      this.getOrgList()
      this.getStationList()
    },
    methods: {
      getOrgList() {
        if (this.orgData.length === 0) {
          const parameter = {
            name: null,
            status: true,
          }
          getOrgList(parameter).then((response) => {
            this.orgData = response.data
          })
        }
      },
      handleSizeChange(val) {
        this.queryParam.pageSize = val
        this.getStationList()
      },
      handleCurrentChange(val) {
        this.queryParam.pageNum = val
        this.getStationList()
      },
      async getStationList() {
        this.tableLoading = true
        const params = {
          pageNum: this.queryParam.pageNum,
          pageSize: this.queryParam.pageSize,
          model: {
            name: this.queryParam.name,
            org:
              this.queryParam.orgId === null
                ? null
                : {
                    key: this.queryParam.orgId,
                    data: null,
                  },
          },
        }
        getStationPageList(params).then((response) => {
          const result = response.data
          this.total = parseInt(result.total)
          this.stationData = result.list
          for (const station of this.stationData) {
            station.createTime = moment(station.createTime).format(
              'YYYY-MM-DD HH:mm:ss'
            )
          }
          this.tableLoading = false
        })
      },
      loadListOptions({ callback }) {
        callback()
      },
      handleAdd() {
        const createData = {
          status: '1',
          orgData: this.orgData,
        }
        this.$refs['editForm'].showDialog(createData)
      },
      handleEdit(record) {
        const data = {
          id: record.id,
          name: record.name,
          org: record.org === null ? '' : record.org.key,
          status: record.status === true ? '1' : '2',
          describe: record.describe,
          orgData: this.orgData,
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
        deleteStation({ ids: [id] }).then((response) => {
          const responseData = response.data
          if (responseData) {
            this.$message.success('删除岗位成功')
            this.getStationList()
          } else {
            this.$message.error('删除岗位失败')
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
            debugger
            deleteStation(parameter).then((response) => {
              const responseData = response.data
              if (responseData) {
                this.$message.success('删除岗位成功')
                this.getStationList()
              } else {
                this.$message.error('删除岗位失败')
              }
            })
          })
        } else {
          this.$message.error('未选中任何行')
        }
      },
      handleImportData(data) {
        const formData = new FormData()
        formData.append('file', data.file)
        importStationData(formData).then((response) => {
          const responseData = response.data
          if (responseData > 0) {
            this.$message.success('导入岗位' + responseData + '条记录')
            this.getUserPage()
          } else {
            this.$message.error('导入岗位失败')
          }
        })
      },
      async handleExportExcelData() {
        const params = {
          name: this.queryParam.name,
          org:
            this.queryParam.orgId === null
              ? null
              : {
                  key: this.queryParam.orgId,
                  data: null,
                },
        }
        exportStationExcelData(params).then((response) => {
          downloadFile(response)
        })
      },
      handleSelectionChange(val) {
        this.selectedRows = val
      },
    },
  }
</script>
