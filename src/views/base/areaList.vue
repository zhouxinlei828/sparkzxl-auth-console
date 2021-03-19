<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="12">
        <el-card style="overflow-y: auto; height: 550px">
          <div slot="header" class="clearfix">
            <span>地区</span>
          </div>
          <el-form :inline="true" size="small">
            <el-form-item>
              <el-input v-model="filterText" placeholder="输入关键字进行过滤">
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
                @click="resetForm"
              >
                重置
              </el-button>
              <el-button
                size="small"
                style="margin-left: 12px"
                icon="el-icon-delete"
                type="danger"
                @click="handleDelete"
              >
                删除
              </el-button>
            </el-form-item>
          </el-form>
          <div style="overflow-y: auto; height: 390px">
            <el-tree
              ref="area-tree"
              v-loading="treeLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              :data="areaData"
              node-key="id"
              check-on-click-node
              show-checkbox
              :default-expand-all="false"
              :highlight-current="true"
              :filter-node-method="filterNode"
              @node-click="handleNodeClick"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="overflow-y: auto; height: 550px">
          <div slot="header" class="clearfix">
            <span>{{ title }}</span>
          </div>
          <el-form
            ref="ruleForm"
            :model="form"
            :rules="rules"
            label-width="100px"
          >
            <el-form-item
              label="上级地区:"
              prop="parentId"
              required
              aria-readonly="true"
            >
              <el-input v-model="form.parentId" style="width: 320px" />
            </el-form-item>
            <el-form-item label="编码:" prop="code">
              <el-input v-model="form.code" style="width: 320px" />
            </el-form-item>
            <el-form-item label="名称:" prop="label" required>
              <el-input v-model="form.label" style="width: 320px" />
            </el-form-item>
            <el-form-item label="排序值:" prop="sortValue">
              <el-input-number
                v-model="form.sortValue"
                :min="1"
                :max="100"
                style="width: 320px"
              />
            </el-form-item>
            <el-form-item label="行政区级:" prop="level">
              <el-radio-group v-model="form.level" size="small">
                <el-radio-button label="COUNTRY">国家</el-radio-button>
                <el-radio-button label="PROVINCE">省份/直辖市</el-radio-button>
                <el-radio-button label="CITY">地市</el-radio-button>
                <el-radio-button label="COUNTY">区县</el-radio-button>
                <el-radio-button label="TOWNS">乡镇</el-radio-button>
              </el-radio-group>
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
  import { getAreaTree, saveArea, updateArea, deleteArea } from '@/api/area'

  export default {
    data() {
      return {
        areaData: [],
        filterText: '',
        title: '新增地区',
        buttonName: '新增',
        parentId: 0,
        form: {
          id: null,
          parentId: 0,
          label: '',
          sortValue: 1,
          level: 'COUNTRY',
        },
        areaId: 0,
        treeLoading: false,
        rules: {
          parentId: [
            { required: true, message: '上级ID不能为空', trigger: 'blur' },
          ],
          label: [
            { required: true, message: '地区名称不能为空', trigger: 'blur' },
          ],
        },
      }
    },
    watch: {
      filterText(val) {
        this.$refs['area-tree'].filter(val)
      },
    },
    created() {
      this.getAreaTree()
    },
    methods: {
      getAreaTree() {
        this.treeLoading = true
        getAreaTree().then((response) => {
          const responseData = response.data
          this.areaData = responseData
          if (this.areaData.length > 0) {
            this.areaId = this.areaId === 0 ? responseData[0].id : this.areaId
            this.setCurrentNodeKey(responseData[0].id)
          }
          this.treeLoading = false
        })
      },
      handleAdd() {
        this.title = '新增地区'
        this.buttonName = '新增'
        this.form = {
          id: null,
          parentId: this.parentId,
          label: '',
          level: 'COUNTRY',
          sortValue: 1,
        }
      },
      handleSave() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            const submitData = this.form
            if (submitData.id !== null) {
              updateArea(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('修改地区信息成功')
                  this.resetForm()
                  this.getAreaTree()
                } else {
                  this.$message.error('修改地区信息失败')
                }
              })
            } else {
              saveArea(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('新增地区信息成功')
                  this.resetForm()
                  this.getAreaTree()
                } else {
                  this.$message.error('新增地区信息失败')
                }
              })
            }
          } else {
            return false
          }
        })
      },
      handleDelete() {
        const checkedKeys = this.$refs['area-tree'].getCheckedKeys()
        deleteArea(checkedKeys).then((response) => {
          const responseData = response.data
          if (responseData) {
            this.$message.success('删除地区成功')
            this.resetForm()
            this.getAreaTree()
          } else {
            this.$message.error('删除地区失败')
          }
        })
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      setCurrentNodeKey(key) {
        this.$nextTick(function () {
          this.$refs['area-tree'].setCurrentKey(key)
        })
      },
      handleNodeClick(data) {
        this.title = '修改地区'
        this.buttonName = '修改'
        this.parentId = data.id
        this.areaId = data.id
        this.form = {
          id: data.id,
          parentId: data.parentId,
          label: data.label,
          level: data.level == null ? 'COUNTRY' : data.level,
          sortValue: data.sortValue,
        }
      },
      resetForm() {
        this.$refs['ruleForm'].resetFields()
        this.title = '新增地区'
        this.buttonName = '新增'
        this.filterText = ''
      },
    },
  }
</script>
