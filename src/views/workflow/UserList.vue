<template>
  <div class="filter-container" style="padding-bottom: 0">
    <el-input
      v-model="queryParam.account"
      class="filter-item search-item"
      placeholder="账号"
    />
    <el-input
      v-model="queryParam.name"
      class="filter-item search-item"
      placeholder="姓名"
    />
    <el-button
      size="small"
      class="filter-item button-item"
      icon="search"
      type="primary"
      @click="getUserPage()"
    >
      查询
    </el-button>
    <el-button
      size="small"
      class="filter-item button-item"
      @click="() => (queryParam = {})"
    >
      重置
    </el-button>
    <el-divider content-position="left">用户列表</el-divider>
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
        :headers="headers"
        :before-upload="beforeUpload"
        :accept="uploadAccept"
        action="/api/workflow/process/user/import"
        :limit="1"
        :show-file-list="false"
        :on-success="uploadProcessUserSuccess"
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
      :data="userTableData"
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
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="status" label="状态" align="center" width="80">
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
    <user-edit-form ref="editForm" @fetch-data="getUserPage" />
  </div>
</template>
<script>
  import moment from 'moment'
  import {
    deleteUser,
    exportExcelUserData,
    getUserPage,
  } from '@/api/process-user'

  import UserEditForm from './modules/UserEditForm'
  import { downloadFile } from '@/utils/util'
  import { getAccessToken, getTenant } from '@/utils/storageUtils'
  import { tokenHeaderKey } from '@/config/setting.config'

  export default {
    components: {
      UserEditForm,
    },
    data() {
      return {
        showPagination: true,
        advanced: false,
        headers: {},
        total: 0,
        // 查询参数
        queryParam: {
          pageNum: 1,
          pageSize: 10,
          account: null,
          name: null,
        },
        layout: 'total, sizes, prev, pager, next, jumper',
        userTableData: [],
        uploadAccept: '.xls,.xlsx',
        tableLoading: false,
        excelTemplate:
          'https://oss.sparksys.top/template/流程用户导入模板.xlsx',
        selectedRows: [],
      }
    },
    created() {
      this.getUserPage()
    },
    methods: {
      handleSelectionChange(val) {
        this.selectedRows = val
      },
      handleSizeChange(val) {
        this.queryParam.pageSize = val
        this.getUserPage()
      },
      handleCurrentChange(val) {
        this.queryParam.pageNum = val
        this.getUserPage()
      },
      getUserPage() {
        this.tableLoading = true
        const params = {
          pageNum: this.queryParam.pageNum,
          pageSize: this.queryParam.pageSize,
          model: {
            account: this.queryParam.account,
            name: this.queryParam.name,
          },
        }
        getUserPage(params).then((response) => {
          const result = response.data
          this.total = parseInt(result.total)
          this.userTableData = result.list
          for (const model of this.userTableData) {
            model.createTime = moment(model.createTime).format(
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
          account: null,
          name: null,
          status: '1',
        }
        this.$refs['editForm'].showDialog(createData)
      },
      handleEdit(record) {
        const data = {
          id: record.id,
          account: record.account,
          name: record.name,
          status: record.status === true ? '1' : '2',
        }
        this.$refs['editForm'].showDialog(data)
      },
      handleSave() {
        this.getUserPage()
      },
      handleDelete(id) {
        const parameter = {
          ids: [id],
        }
        deleteUser(parameter).then((response) => {
          const responseData = response.data
          if (responseData) {
            this.$message.success('删除用户成功')
            this.getUserPage()
          } else {
            this.$message.error('删除用户失败')
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
            deleteUser(parameter).then((response) => {
              const responseData = response.data
              if (responseData) {
                this.$message.success('删除用户成功')
                this.getUserPage()
              } else {
                this.$message.error('删除用户失败')
              }
            })
          })
        } else {
          this.$message.error('未选中任何行')
        }
      },
      beforeUpload(file) {
        this.headers['tenant'] = getTenant()
        this.headers[tokenHeaderKey] = 'Bearer ' + getAccessToken()
      },
      uploadProcessUserSuccess(response, file, fileList) {
        console.log(response)
        if (response.success) {
          const responseData = response.data
          this.$message.success('Excel导入用户' + responseData + '条记录')
          this.getUserPage()
        } else {
          this.$message.error('Excel导入用户失败')
        }
      },
      async handleExportExcelData() {
        const params = {
          account: this.queryParam.account,
          name: this.queryParam.name,
        }
        exportExcelUserData(params).then((response) => {
          downloadFile(response)
        })
      },
      resetSearchForm() {
        this.queryParam = {
          date: moment(new Date()),
        }
      },
    },
  }
</script>
