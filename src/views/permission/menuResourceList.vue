<template>
  <div class="filter-container" style="padding-bottom: 0">
    <el-form :inline="true" size="small">
      <el-form-item label="菜单名称">
        <el-input
          v-model="filterText"
          prefix-icon="el-icon-search"
          placeholder="请输入菜单"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="search" @click="getMenuTree()">
          查询
        </el-button>
        <el-button
          size="small"
          style="margin-left: 8px"
          @click="() => (this.filterText = '')"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">菜单列表</el-divider>
    <div class="table-operator">
      <el-button size="small" type="primary" @click="handleAdd">
        添加菜单
      </el-button>
    </div>
    <el-table
      ref="menuTable"
      v-loading="menuLoading"
      :data="menuData"
      max-height="450"
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
        label="菜单标题"
        show-overflow-tooltip
        width="190"
      ></el-table-column>
      <el-table-column prop="icon" label="图标" align="center">
        <template #default="{ row }">
          <div v-if="row.icon !== null && row.icon !== ''">
            <IconFont :type="row.icon" />
          </div>
          <div v-if="row.icon !== null && row.icon !== ''">
            <i :class="row.icon" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="sortValue" label="排序" />
      <el-table-column prop="resourceList" label="资源">
        <template #default="{ row }">
          <div v-if="row.resourceList !== null">
            <el-checkbox-group v-model="resourceList">
              <el-checkbox
                v-for="resource in row.resourceList"
                :key="resource.id"
                :label="resource.name"
                disabled
              >
                {{ resource.name }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-link type="primary">
            <IconFont type="icon-edit" @click="handleEditMenu(row)" />
          </el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link type="primary">
            <IconFont
              type="icon-template_delete"
              @click="handleDeleteMenu(row.id)"
            />
          </el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link type="primary">
            <el-button type="text" @click="handleAddResource(row.id)">
              菜单资源
            </el-button>
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <menu-resource-form ref="menuResourceForm" @fetch-data="getMenuTree" />
    <menu-edit-form ref="menuEditForm" @fetch-data="getMenuTree" />
  </div>
</template>

<script>
  import { deleteMenu, getMenuTree } from '@/api/menu'
  import MenuEditForm from '@/views/permission/modules/MenuEditForm'
  import MenuResourceForm from '@/views/permission/modules/MenuResourceForm'
  export default {
    components: {
      MenuEditForm,
      MenuResourceForm,
    },
    data() {
      return {
        menuData: [],
        defaultProps: {
          children: 'children',
          label: 'label',
        },
        resourceList: [],
        menuLoading: false,
        filterText: '',
      }
    },
    created() {
      this.getMenuTree()
    },
    methods: {
      getMenuTree() {
        this.menuLoading = true
        getMenuTree({ label: this.filterText }).then((response) => {
          this.menuData = response.data
          this.menuLoading = false
        })
      },
      handleAdd() {
        const data = {
          id: null,
          parentId: 0,
          hidden: 1,
          icon: null,
          noKeepAlive: 1,
          redirect: null,
          label: null,
          path: null,
          component: null,
          componentName: null,
          isEnable: '1',
          sortValue: 1,
          describe: null,
          menuTree: this.menuData,
        }
        this.$refs['menuEditForm'].showDialog(data)
      },
      handleEditMenu(row) {
        const data = {
          id: row.id,
          parentId: row.parentId,
          hidden: row.hidden === true ? 0 : 1,
          icon: row.icon,
          noKeepAlive: row.noKeepAlive === true ? 0 : 1,
          redirect: row.redirect,
          label: row.label,
          path: row.path,
          component: row.component,
          componentName: row.componentName,
          isEnable: row.isEnable === true ? '1' : '2',
          sortValue: row.sortValue,
          describe: row.describe,
          menuTree: this.menuData,
        }
        this.$refs['menuEditForm'].showDialog(data)
      },
      handleAddResource(menuId) {
        const data = {
          menuId: menuId,
        }
        this.$refs['menuResourceForm'].showDialog(data)
      },
      handleDeleteMenu(id) {
        const data = {
          ids: [id],
        }
        deleteMenu(data).then((response) => {
          const responseData = response.data
          if (responseData) {
            this.$message.success('删除菜单成功')
            this.getMenuTree()
          } else {
            this.$message.error('删除菜单失败')
          }
        })
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
    },
  }
</script>
