<template>
  <div class="filter-container" style="padding-bottom: 0">
    <el-form :inline="true" size="small">
      <el-form-item>
        <el-input
          v-model="filterText"
          placeholder="输入关键字进行过滤"
          @change="getOrgList"
        >
          >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="search" @click="getOrgList()">
          查询
        </el-button>
        <el-button
          style="margin-left: 8px"
          @click="() => (this.filterText = null)"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">组织列表</el-divider>
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
    </div>
    <el-table
      ref="orgTable"
      v-loading="treeLoading"
      :data="orgData"
      default-expand-all
      max-height="400"
      style="width: 100%"
      row-key="id"
      row-class-name="table-row"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      highlight-current-row
    >
      <el-table-column
        prop="label"
        label="组织名称"
        show-overflow-tooltip
        width="250"
      ></el-table-column>
      <el-table-column prop="abbreviation" label="组织简称"></el-table-column>
      <el-table-column prop="describe" label="组织描述"></el-table-column>
      <el-table-column prop="sortValue" label="排序"></el-table-column>
      <el-table-column prop="status" align="center" label="状态" width="80">
        <template #default="{ row }">
          <el-tag
            :type="row.status === true ? 'primary' : 'success'"
            disable-transitions
          >
            {{ row.status === true ? '启用' : '停用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-link type="primary">
            <IconFont
              type="icon-template_delete"
              @click="handleDelete(row.id)"
            />
          </el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link type="primary">
            <IconFont type="icon-edit" @click="handleEdit(row)" />
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <org-edit-form ref="editForm" @fetch-data="getOrgList" />
  </div>
</template>

<script>
  import { deleteOrg, getOrgList } from '@/api/org'
  import OrgEditForm from './modules/OrgEditForm'
  export default {
    components: {
      OrgEditForm,
    },
    data() {
      return {
        orgData: [],
        filterText: null,
        parentId: 0,
        treeLoading: false,
      }
    },
    created() {
      this.getOrgList()
    },
    methods: {
      getOrgList() {
        this.treeLoading = true
        const parameter = {
          name: this.filterText,
          status: true,
        }
        getOrgList(parameter).then((response) => {
          this.orgData = response.data
          this.treeLoading = false
        })
      },
      handleAdd() {
        const createData = {
          id: null,
          parentId: '0',
          label: null,
          abbreviation: null,
          describe: null,
          status: '1',
          sortValue: 1,
          attribute: {},
        }
        this.$refs['editForm'].showDialog(createData)
      },
      handleEdit(record) {
        const data = {
          id: record.id,
          parentId: record.parentId,
          label: record.label,
          abbreviation: record.abbreviation,
          status: record.status === true ? '1' : '2',
          describe: record.describe,
          sortValue: record.sortValue,
          attribute: record.attribute,
        }
        this.$refs['editForm'].showDialog(data)
      },
      handleDelete(id) {
        deleteOrg({ ids: [id] }).then((response) => {
          const responseData = response.data
          if (responseData) {
            this.$message.success('删除组织成功')
            this.getOrgList()
          } else {
            this.$message.error('删除组织失败')
          }
        })
      },
    },
  }
</script>
