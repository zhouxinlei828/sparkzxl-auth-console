<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="closeDialog"
  >
    <el-form
      ref="ruleForm"
      :inline="true"
      :model="form"
      :rules="rules"
      :label-position="labelPosition"
      size="small"
      label-width="120px"
    >
      <el-form-item label="账号:" prop="account" required>
        <el-input v-model="form.account" class="edit-form-item" />
      </el-form-item>
      <el-form-item label="姓名:" prop="name" required>
        <el-input v-model="form.name" class="edit-form-item" />
      </el-form-item>
      <el-form-item
        v-if="form.id === undefined"
        label="密码:"
        prop="account"
        required
      >
        <el-input
          v-model="form.password"
          type="password"
          class="edit-form-item"
        />
      </el-form-item>
      <el-form-item label="组织:" prop="org">
        <TreeSelect
          v-model="form.orgId"
          class="edit-form-item"
          :load-options="loadListOptions"
          :multiple="false"
          placeholder="组织"
          :searchable="true"
          :options="orgData"
        />
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input v-model="form.email" class="edit-form-item" />
      </el-form-item>
      <el-form-item label="岗位:" prop="station">
        <el-select
          v-model="form.stationId"
          placeholder="请选择岗位"
          class="edit-form-item"
        >
          <el-option
            v-for="item in stationData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话:" prop="mobile">
        <el-input v-model="form.mobile" class="edit-form-item" />
      </el-form-item>
      <el-form-item label="性别:" prop="sex">
        <el-select
          v-model="form.sex"
          placeholder="请选择性别"
          class="edit-form-item"
        >
          <el-option
            v-for="item in sexData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="民族:" prop="nation">
        <el-select
          v-model="form.nation"
          placeholder="请选择民族"
          class="edit-form-item"
        >
          <el-option
            v-for="item in nationData"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学历:" prop="nation">
        <el-select
          v-model="form.education"
          placeholder="请选择学历"
          class="edit-form-item"
        >
          <el-option
            v-for="item in educationData"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职位状态:" prop="positionStatus">
        <el-select
          v-model="form.positionStatus"
          placeholder="请选择职位状态"
          class="edit-form-item"
        >
          <el-option
            v-for="item in positionStatusData"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态:" prop="status">
        <el-radio v-model="form.status" label="1">启用</el-radio>
        <el-radio v-model="form.status" label="2">禁用</el-radio>
      </el-form-item>
      <el-form-item label="描述:" prop="workDescribe">
        <el-input
          v-model="form.workDescribe"
          type="textarea"
          style="width: 530px"
        />
      </el-form-item>
    </el-form>
    <el-divider content-position="left">用户扩展信息</el-divider>
    <div class="filter-container">
      <el-button
        size="small"
        class="filter-item"
        icon="el-icon-plus"
        type="primary"
        @click="handleAddUserAttribute"
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
              @click="handleDeleteUserAttribute(scope.$index)"
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
  import { saveUser, updateUser } from '@/api/user'
  import { getStationList } from '@/api/station'
  import { getDictionaryItemList } from '@/api/dictionary'
  import { objToArray } from '@/utils/util'

  export default {
    props: {
      model: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        title: '新增用户',
        form: {
          account: null,
          name: null,
          password: null,
          orgId: null,
          stationId: null,
          email: null,
          mobile: null,
          sex: '1',
          nation: null,
          education: null,
          positionStatus: null,
          status: '1',
          workDescribe: null,
        },
        labelPosition: 'right',
        attributes: [],
        rules: {
          account: [
            { required: true, message: '账号不能为空', trigger: 'blur' },
          ],
          name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
          ],
        },
        dialogFormVisible: false,
        sexData: [
          {
            value: '1',
            label: '男',
          },
          {
            value: '2',
            label: '女',
          },
          {
            value: '3',
            label: '未知',
          },
        ],
        status: 1,
        orgData: [],
        nationData: [],
        stationData: [],
        educationData: [],
        positionStatusData: [],
      }
    },
    created() {
      this.getEducationList()
      this.getStationList()
      this.getNationList()
      this.getPositionStatusList()
    },
    methods: {
      showDialog(data) {
        if (data.id !== undefined) {
          this.title = '修改用户'
          this.attributes = objToArray(data.extendInfo)
        } else {
          this.title = '新增用户'
          this.attributes = []
        }
        this.orgData = data.orgData
        delete data.orgData
        this.dialogFormVisible = true
        this.form = data
      },
      loadListOptions({ callback }) {
        callback()
      },
      getPositionStatusList() {
        if (this.educationData.length === 0) {
          const data = {
            dictionaryType: 'POSITION_STATUS',
          }
          getDictionaryItemList(data).then((response) => {
            this.positionStatusData = response.data
          })
        }
      },
      getStationList() {
        if (this.stationData.length === 0) {
          getStationList({}).then((response) => {
            this.stationData = response.data
          })
        }
      },
      getNationList() {
        if (this.nationData.length === 0) {
          const data = {
            dictionaryType: 'NATION',
          }
          getDictionaryItemList(data).then((response) => {
            this.nationData = response.data
          })
        }
      },
      getEducationList() {
        if (this.educationData.length === 0) {
          const data = {
            dictionaryType: 'EDUCATION',
          }
          getDictionaryItemList(data).then((response) => {
            this.educationData = response.data
          })
        }
      },
      onSubmit() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            const status = parseInt(this.form.status) === 1
            const submitData = this.form
            submitData.status = status
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
            if (this.form.id !== undefined) {
              submitData.id = this.form.id
              updateUser(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('修改用户成功')
                  setTimeout(() => {
                    this.resetForm()
                  }, 1000)
                } else {
                  this.$message.error('修改用户失败')
                }
              })
            } else {
              saveUser(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('新增用户成功')
                  this.$refs['ruleForm'].resetFields()
                  this.dialogFormVisible = false
                  setTimeout(() => {
                    this.resetForm()
                  }, 1000)
                } else {
                  this.$message.error('新增用户失败')
                }
              })
            }
          } else {
            return false
          }
        })
      },
      resetForm() {
        this.$refs['ruleForm'].resetFields()
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      handleAddUserAttribute() {
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
      handleDeleteUserAttribute(index) {
        this.attributes.splice(index, 1)
      },
      closeDialog() {
        this.$refs['ruleForm'].resetFields()
        this.dialogFormVisible = false
      },
    },
  }
</script>
