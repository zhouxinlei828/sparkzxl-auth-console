<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="14">
        <el-card shadow="hover" style="overflow-y: auto; height: 560px">
          <div slot="header" class="clearfix">
            <span>组织</span>
          </div>
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
              <el-button
                size="small"
                style="margin-left: 12px"
                type="primary"
                @click="handleAdd"
              >
                添加
              </el-button>
              <el-button
                size="small"
                style="margin-left: 12px"
                @click="() => (this.filterText = '')"
              >
                重置
              </el-button>
            </el-form-item>
          </el-form>
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
            @current-change="handleCurrentTableChange"
          >
            <el-table-column
              prop="label"
              label="组织名称"
              show-overflow-tooltip
              width="250"
            ></el-table-column>
            <el-table-column
              prop="abbreviation"
              label="组织简称"
              align="center"
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
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card shadow="hover" style="overflow-y: auto; height: 560px">
          <div slot="header" class="clearfix">
            <span>{{ title }}</span>
          </div>
          <el-form
            ref="ruleForm"
            :model="form"
            :rules="rules"
            label-width="120px"
            :label-position="labelPosition"
          >
            <el-form-item label="上级ID:" prop="parentId" required>
              <TreeSelect
                v-model="form.parentId"
                class="edit-form-item"
                :load-options="loadListOptions"
                :multiple="false"
                :searchable="true"
                placeholder="上级组织"
                :options="orgTreeData"
              />
            </el-form-item>
            <el-form-item label="组织名称:" prop="label" required>
              <el-input v-model="form.label" class="edit-form-item" />
            </el-form-item>
            <el-form-item label="简称:" prop="abbreviation">
              <el-input v-model="form.abbreviation" class="edit-form-item" />
            </el-form-item>
            <el-form-item label="描述:" prop="describe">
              <el-input v-model="form.describe" class="edit-form-item" />
            </el-form-item>
            <el-form-item label="状态:" prop="status" required>
              <el-radio v-model="form.status" label="1">启用</el-radio>
              <el-radio v-model="form.status" label="2">禁用</el-radio>
            </el-form-item>
            <el-form-item label="排序值:" prop="status">
              <el-input-number v-model="form.sortValue" :min="1" :max="100" />
            </el-form-item>
            <el-form-item>
              <el-button
                size="small"
                style="margin-left: 12px"
                type="primary"
                @click="handleSave"
              >
                {{ buttonName }}
              </el-button>
              <el-button
                size="small"
                style="margin-left: 12px"
                @click="resetForm"
              >
                重置
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { deleteOrg, getOrgList, saveOrg, updateOrg } from '@/api/org'

  export default {
    data() {
      return {
        orgData: [],
        orgTreeData: [],
        filterText: null,
        title: '新增组织',
        buttonName: '新增',
        parentId: 0,
        treeLoading: false,
        parentMenu: {
          id: '0',
          label: '顶级组织',
          parentId: null,
          sortValue: 1,
          children: null,
        },
        form: {
          id: null,
          parentId: '0',
          label: null,
          abbreviation: null,
          describe: null,
          status: '1',
          sortValue: 1,
        },
        labelPosition: 'right',
        rules: {
          parentId: [
            { required: true, message: '上级组织不能为空', trigger: 'blur' },
          ],
          label: [
            { required: true, message: '组织名称不能为空', trigger: 'blur' },
          ],
          status: [
            { required: true, message: '状态不能为空', trigger: 'blur' },
          ],
        },
      }
    },
    created() {
      this.getOrgList()
      this.getOrgTreeList()
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
      getOrgTreeList() {
        const parameter = {
          name: null,
          status: true,
        }
        getOrgList(parameter).then((response) => {
          this.orgTreeData.push(this.parentMenu)
          const tree = response.data
          tree.forEach((item) => {
            this.orgTreeData.push(item)
          })
        })
      },
      handleAdd() {
        this.title = '新增组织'
        this.buttonName = '新增'
        this.form = {
          id: null,
          parentId: '0',
          label: '',
          abbreviation: '',
          describe: '',
          status: '1',
          sortValue: 1,
        }
      },
      handleSave() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            const submitData = this.form
            submitData.status = this.form.status === '1'
            if (submitData.id != null) {
              updateOrg(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('修改组织成功')
                  this.getOrgList()
                } else {
                  this.$message.error('修改组织失败')
                }
              })
            } else {
              saveOrg(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('新增组织成功')
                  this.getOrgList()
                } else {
                  this.$message.error('新增组织失败')
                }
              })
            }
          } else {
            return false
          }
        })
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
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      loadListOptions({ callback }) {
        callback()
      },
      handleCurrentTableChange(data) {
        this.title = '修改组织'
        this.buttonName = '修改'
        this.form = {
          id: data.id,
          parentId: data.parentId,
          label: data.label,
          abbreviation: data.abbreviation,
          describe: data.describe,
          status: data.status === true ? '1' : '2',
          sortValue: data.sortValue,
        }
      },
      resetForm() {
        this.$refs['ruleForm'].resetFields()
        this.title = '新增'
        this.buttonName = '新增'
      },
    },
  }
</script>
