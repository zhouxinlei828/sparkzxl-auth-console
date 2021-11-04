<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="700px"
    @close="closeDialog"
  >
    <el-form
      ref="ruleForm"
      :model="form"
      :inline="true"
      :rules="rules"
      label-width="100px"
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
      <br />
      <el-form-item label="排序值:" prop="sortNumber">
        <el-input-number v-model="form.sortNumber" :min="1" :max="100" />
      </el-form-item>
    </el-form>
    <el-divider content-position="left">组织扩展信息</el-divider>
    <div class="filter-container">
      <el-button
        size="small"
        class="filter-item"
        icon="el-icon-plus"
        type="primary"
        @click="handleAddOrgAttribute"
      >
        新建
      </el-button>
    </div>
    <el-table :data="attributes" border style="width: 100%" max-height="450">
      <el-table-column type="index" label="序号" width="55"></el-table-column>
      <el-table-column prop="attributeKey" label="属性key">
        <template #default="{ row }">
          <el-input v-model="row.attributeKey" />
        </template>
      </el-table-column>
      <el-table-column prop="attributeValue" label="属性值">
        <template #default="{ row }">
          <el-input v-model="row.attributeValue" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-link type="primary">
            <IconFont
              type="icon-template_delete"
              @click="handleDeleteOrgAttributes(scope.$index)"
            />
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" class="button-item" @click="closeDialog">
        取 消
      </el-button>
      <el-button
        size="small"
        class="button-item"
        type="primary"
        @click="onSubmit"
      >
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { getOrgList, saveOrg, updateOrg } from '@/api/org'
  import { objToArray } from '@/utils/util'

  export default {
    data() {
      return {
        title: '',
        dialogFormVisible: false,
        form: {
          id: null,
          parentId: '0',
          label: null,
          abbreviation: null,
          describe: null,
          status: '1',
          sortNumber: 1,
        },
        orgTreeData: [],
        attributes: [],
        parentOrg: {
          id: '0',
          label: '顶级组织',
          parentId: null,
          sortNumber: 1,
          children: null,
        },
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
        status: 1,
        orgData: [],
      }
    },
    methods: {
      showDialog(data) {
        this.getOrgTreeList()
        if (data.id !== undefined) {
          this.title = '修改组织'
          this.attributes = objToArray(data.extendInfo)
        } else {
          this.title = '新增组织'
          this.attributes = []
        }
        this.dialogFormVisible = true
        this.form = data
      },
      loadListOptions({ callback }) {
        callback()
      },
      async getOrgTreeList() {
        const parameter = {
          name: null,
          status: true,
        }
        this.orgTreeData = []
        const { data } = await getOrgList(parameter)
        this.orgTreeData.push(this.parentOrg)
        data.forEach((item) => {
          this.orgTreeData.push(item)
        })
      },
      onSubmit() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            const submitData = this.form
            submitData.status = this.form.status === 1
            const extendInfo = {}
            const attributes = this.attributes
            if (attributes.length > 0) {
              for (const data of attributes) {
                extendInfo[data.attributeKey] = data.attributeValue
              }
              submitData.extendInfo = extendInfo
            } else {
              submitData.extendInfo = null
            }
            if (submitData.id != null) {
              updateOrg(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('修改组织成功')
                  setTimeout(() => {
                    this.resetForm()
                  }, 1000)
                } else {
                  this.$message.error('修改组织失败')
                }
              })
            } else {
              saveOrg(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('新增组织成功')
                  setTimeout(() => {
                    this.resetForm()
                  }, 1000)
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
      handleAddOrgAttribute() {
        let attributes = this.attributes
        if (attributes === undefined || attributes === null) {
          attributes = []
        }
        attributes.push({
          attributeKey: '',
          attributeValue: '',
        })
        this.attributes = attributes
      },
      handleDeleteOrgAttributes(index) {
        this.attributes.splice(index, 1)
      },
      resetForm() {
        this.$refs['ruleForm'].resetFields()
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      closeDialog() {
        this.$refs['ruleForm'].resetFields()
        this.dialogFormVisible = false
      },
    },
  }
</script>
