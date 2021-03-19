<template>
  <div class="filter-container" style="padding-bottom: 0">
    <el-input
      v-model="queryParam.code"
      size="small"
      class="filter-item search-item"
      placeholder="租户编码"
    />
    <el-input
      v-model="queryParam.name"
      size="small"
      class="filter-item search-item"
      placeholder="租户名称"
    />
    <el-button
      size="small"
      class="filter-item button-item"
      icon="search"
      type="primary"
      @click="getTenantList()"
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
            code: null,
            name: null,
          })
      "
    >
      重置
    </el-button>
    <el-divider content-position="left">租户列表</el-divider>
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
      <el-table-column type="expand" label="管理员" width="70">
        <template slot-scope="props">
          <el-form label-position="left" inline>
            <el-form-item label="管理员账户:">
              <el-tag type="success" disable-transitions>
                {{ props.row.adminUser.account }}
              </el-tag>
            </el-form-item>
            <el-form-item label="管理员密码:">
              <el-tag type="warning" disable-transitions>
                {{ props.row.adminUser.originalPassword }}
              </el-tag>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="code"
        label="租户编码"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="租户名称"
        width="150"
      ></el-table-column>
      <el-table-column prop="expirationTime" label="租户有效期" width="130">
        <template #default="{ row }">
          <el-tag type="primary" disable-transitions>
            {{ row.expirationTime === null ? '永久' : row.expirationTime }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="passwordExpire"
        label="用户密码有效期/秒"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="passwordErrorNum"
        label="密码输错次数"
      ></el-table-column>
      <el-table-column prop="status" label="状态" width="80">
        <template #default="{ row }">
          <el-tag
            :type="row.status === true ? 'primary' : 'success'"
            disable-transitions
          >
            {{ row.status === true ? '正常' : '禁用' }}
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
    <tenant-edit-form ref="editForm" @fetch-data="getTenantList" />
  </div>
</template>

<script>
  import moment from 'moment'
  import TenantEditForm from './modules/TenantEditForm'
  import { getTenantPageList, deleteTenant } from '@/api/tenant'

  export default {
    components: {
      TenantEditForm,
    },
    data() {
      return {
        total: 0,
        // 查询参数
        queryParam: {
          pageNum: 1,
          pageSize: 10,
          code: null,
          name: null,
        },
        layout: 'total, sizes, prev, pager, next, jumper',
        orgData: [],
        stationData: [],
        tableLoading: false,
        selectedRows: [],
      }
    },
    mounted() {
      this.getTenantList()
    },
    methods: {
      handleSelectionChange(val) {
        this.selectedRows = val
      },
      handleSizeChange(val) {
        this.queryParam.pageSize = val
        this.getTenantList()
      },
      handleCurrentChange(val) {
        this.queryParam.pageNum = val
        this.getTenantList()
      },
      async getTenantList() {
        this.tableLoading = true
        const queryParam = {
          pageNum: this.queryParam.pageNum,
          pageSize: this.queryParam.pageSize,
          model: {
            code: this.queryParam.code,
            name: this.queryParam.name,
          },
        }
        getTenantPageList(queryParam).then((response) => {
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
          logo: null,
          expirationTime: null,
          passwordExpire: 7200,
          passwordErrorNum: 5,
          passwordErrorLockTime: 30,
          status: '1',
          describe: null,
        }
        this.$refs['editForm'].showDialog(createData)
      },
      handleEdit(record) {
        const data = {
          id: record.id,
          name: record.name,
          logo: record.logo,
          expirationTime: record.expirationTime,
          passwordExpire: record.passwordExpire,
          passwordErrorNum: record.passwordErrorNum,
          passwordErrorLockTime: record.passwordErrorLockTime,
          status: record.status === true ? '1' : '2',
          describe: record.describe,
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
      handleDelete(tenantId) {
        deleteTenant({ ids: [tenantId] }).then((response) => {
          const responseData = response.data
          if (responseData) {
            this.$message.success('删除租户成功')
            this.getTenantList()
          } else {
            this.$message.error('删除租户失败')
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
            deleteTenant(parameter).then((response) => {
              const responseData = response.data
              if (responseData) {
                this.$message.success('删除租户成功')
                this.getTenantList()
              } else {
                this.$message.error('删除租户失败')
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
