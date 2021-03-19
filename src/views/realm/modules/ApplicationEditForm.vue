<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="closeDialog"
  >
    <el-form
      ref="ruleForm"
      :model="form"
      :inline="true"
      :rules="rules"
      label-width="140px"
    >
      <el-form-item label="应用名称:" prop="name" required>
        <el-input v-model="form.name" class="edit-form-item" />
      </el-form-item>
      <el-form-item label="应用访问地址:" prop="website" required>
        <el-input v-model="form.website" class="edit-form-item" />
      </el-form-item>
      <el-form-item label="应用图标:" prop="icon">
        <el-input v-model="form.icon" class="edit-form-item" />
      </el-form-item>
      <el-form-item label="应用类型:" prop="appType" required>
        <el-select
          v-model="form.appType"
          placeholder="请选择应用类型"
          class="edit-form-item"
        >
          <el-option
            v-for="item in applicationTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="健康检查地址:" prop="healthCheck">
        <el-input v-model="form.healthCheck" class="edit-form-item" />
      </el-form-item>
      <el-form-item label="应用简介:" prop="describe">
        <el-input v-model="form.describe" type="textarea" />
      </el-form-item>
      <div v-if="form.appType != null && form.appType === 'SERVER'">
        <el-divider content-position="left">客户端配置</el-divider>
        <el-form-item label="客户端id:" prop="clientId" required>
          <el-input v-model="form.clientId" class="edit-form-item" />
        </el-form-item>
        <el-form-item label="客户端密钥:" prop="clientSecret" required>
          <el-input v-model="form.clientSecret" class="edit-form-item" />
        </el-form-item>
        <el-form-item label="授权模式:" prop="authorizedGrantTypes" required>
          <el-select
            v-model="form.authorizedGrantTypes"
            multiple
            placeholder="请选择授权模式"
            class="edit-form-item"
          >
            <el-option
              v-for="item in authorizedGrantTypeList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限列表:" prop="authorities">
          <el-input v-model="form.authorities" class="edit-form-item" />
        </el-form-item>
        <el-form-item label="资源列表:" prop="resourceIds">
          <el-input v-model="form.resourceIds" class="edit-form-item" />
        </el-form-item>
        <el-form-item label="授权范围:" prop="scope">
          <el-input v-model="form.scope" class="edit-form-item" />
        </el-form-item>
        <el-form-item label="令牌时效:" prop="accessTokenValidity" required>
          <el-tooltip
            class="item"
            effect="dark"
            content="单位：秒"
            placement="right"
          >
            <el-input-number
              v-model="form.accessTokenValidity"
              class="edit-form-item"
              controls-position="right"
              :min="0"
            />
          </el-tooltip>
        </el-form-item>
        <el-form-item label="刷新时效:" prop="refreshTokenValidity" required>
          <el-tooltip
            class="item"
            effect="dark"
            content="单位：秒"
            placement="right"
          >
            <el-input-number
              v-model="form.refreshTokenValidity"
              class="edit-form-item"
              controls-position="right"
              :min="0"
            />
          </el-tooltip>
        </el-form-item>
        <el-form-item label="回调地址:" prop="webServerRedirectUri">
          <el-tooltip
            class="item"
            effect="dark"
            content="以http/https为开头"
            placement="right"
          >
            <el-input
              v-model="form.webServerRedirectUri"
              class="edit-form-item"
            />
          </el-tooltip>
        </el-form-item>
        <el-form-item label="自动放行:" prop="autoApprove">
          <el-radio v-model="form.autoApprove" label="true">是</el-radio>
          <el-radio v-model="form.autoApprove" label="false">否</el-radio>
        </el-form-item>
        <el-form-item label="扩展信息:" prop="additionalInformation">
          <el-input
            v-model="form.additionalInformation"
            type="textarea"
            placeholder="请输入JSON格式"
            style="width: 550px"
          />
        </el-form-item>
      </div>
    </el-form>
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
  import { saveApplication, updateApplication } from '@/api/client'
  import { getDictionaryItemList } from '@/api/dictionary'

  export default {
    data() {
      return {
        title: '',
        dialogFormVisible: false,
        form: {
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
        },
        authorizedGrantTypeList: [],
        applicationTypeList: [],
        rules: {
          name: [
            { required: true, message: '应用名称不能为空', trigger: 'blur' },
          ],
          website: [
            {
              required: true,
              message: '应用访问地址不能为空',
              trigger: 'blur',
            },
          ],
          appType: [
            { required: true, message: '应用类型不能为空', trigger: 'blur' },
          ],
          clientId: [
            { required: true, message: '客户端id不能为空', trigger: 'blur' },
          ],
          clientSecret: [
            { required: true, message: '密钥不能为空', trigger: 'blur' },
          ],
          authorizedGrantTypes: [
            { required: true, message: '授权不能为空', trigger: 'blur' },
          ],
          accessTokenValidity: [
            { required: true, message: '令牌时效不能为空', trigger: 'blur' },
          ],
          refreshTokenValidity: [
            { required: true, message: '刷新时效不能为空', trigger: 'blur' },
          ],
        },
      }
    },
    created() {
      this.getAuthorizedGrantTypeList()
      this.getApplicationTypeList()
    },
    methods: {
      showDialog(data) {
        if (data.clientId !== null) {
          this.title = '修改应用'
        } else {
          this.title = '新增应用'
        }
        this.dialogFormVisible = true
        this.form = data
        console.log(data)
      },
      getAuthorizedGrantTypeList() {
        const data = {
          dictionaryType: 'AUTHORIZED_GRANT_TYPES',
        }
        getDictionaryItemList(data).then((response) => {
          this.authorizedGrantTypeList = response.data
        })
      },
      getApplicationTypeList() {
        const data = {
          dictionaryType: 'APPLICATION_TYPE',
        }
        getDictionaryItemList(data).then((response) => {
          this.applicationTypeList = response.data
        })
      },
      loadListOptions({ callback }) {
        callback()
      },
      onSubmit() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            const appType = this.form.appType
            const submitData = {
              id: this.form.id,
              name: this.form.name,
              website: this.form.website,
              icon: this.form.icon,
              appType: this.form.appType,
              healthCheck: this.form.healthCheck,
              describe: this.form.describe,
            }
            if (appType === 'SERVER') {
              submitData.oauthClientDetail = {
                clientId: this.form.clientId,
                clientSecret: this.form.clientSecret,
                authorizedGrantTypes: this.form.authorizedGrantTypes.join(','),
                authorities: this.form.authorities,
                resourceIds: this.form.resourceIds,
                scope: this.form.scope,
                accessTokenValidity: this.form.accessTokenValidity,
                refreshTokenValidity: this.form.refreshTokenValidity,
                webServerRedirectUri: this.form.webServerRedirectUri,
                autoApprove: this.form.autoApprove,
                additionalInformation: this.form.additionalInformation,
              }
            }
            console.log(submitData)
            if (submitData.id === null) {
              saveApplication(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('新增应用成功')
                  this.resetForm()
                } else {
                  this.$message.error('新增应用失败')
                }
              })
            } else {
              submitData.id = this.form.id
              updateApplication(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('修改应用成功')
                  this.resetForm()
                } else {
                  this.$message.error('修改应用失败')
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
      closeDialog() {
        this.$refs['ruleForm'].resetFields()
        this.dialogFormVisible = false
      },
    },
  }
</script>
