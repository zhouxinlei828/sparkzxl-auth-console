<template>
  <el-dialog
    title="分配组织用户"
    :visible.sync="dialogFormVisible"
    width="700px"
    @close="closeDialog"
  >
    <el-transfer
      v-model="form.userIds"
      :titles="['全部用户', '已选用户']"
      :button-texts="['移除', '添加']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}',
      }"
      :right-default-checked="userIds"
      :filterable="true"
      :props="{ key: 'value', label: 'desc' }"
      :data="data"
      @change="handleChange"
    ></el-transfer>
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
  import { getUserList } from '@/api/user'
  import { saveOrgUser } from '@/api/org'

  export default {
    data() {
      return {
        dialogFormVisible: false,
        data: [],
        userIds: [],
        form: {
          orgId: null,
          userIds: [],
        },
      }
    },
    methods: {
      async showDialog(data) {
        this.form.orgId = data.id
        await this.getUserList()
        this.orgUserList(this.form.orgId)
        this.dialogFormVisible = true
      },
      onSubmit() {
        const submitData = this.form
        saveOrgUser(submitData).then((response) => {
          const responseData = response.data
          if (responseData) {
            this.$message.success('分配用户成功')
            this.resetForm()
          } else {
            this.$message.error('分配用户失败')
          }
        })
      },
      resetForm() {
        this.form.orgId = null
        this.form.userIds = []
        this.userIds = []
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      closeDialog() {
        this.form.orgId = null
        this.form.userIds = []
        this.userIds = []
        this.dialogFormVisible = false
      },
      orgUserList(orgId) {
        const parameter = {
          org: {
            key: orgId,
          },
        }
        getUserList(parameter).then((response) => {
          const authUsers = response.data
          if (authUsers != null) {
            for (const authUser of authUsers) {
              this.form.userIds.push(authUser.id)
            }
            this.userIds = this.form.userIds
          }
        })
      },
      getUserList() {
        if (this.data.length === 0) {
          getUserList({}).then((response) => {
            const responseData = response.data
            for (const authUser of responseData) {
              const jsonData = {
                value: authUser.id,
                desc: authUser.name,
                disabled: false,
              }
              this.data.push(jsonData)
            }
          })
        }
      },
      handleChange(value, direction, movedKeys) {},
    },
  }
</script>
